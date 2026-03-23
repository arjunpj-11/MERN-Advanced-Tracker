import { useState, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { API_KEY_STORAGE, GROQ_MODEL, GROQ_API_URL } from '../utils/constants'

function extractJSON(raw) {
  let text = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()

  const startIndex = text.search(/[\[{]/)
  if (startIndex === -1) throw new Error('No JSON structure found in response')
  text = text.slice(startIndex)

  const openChar  = text[0]
  const closeChar = openChar === '[' ? ']' : '}'
  let depth = 0
  let endIndex = -1
  let inString = false
  let escaped = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (escaped)        { escaped = false; continue }
    if (ch === '\\')    { escaped = true;  continue }
    if (ch === '"')     { inString = !inString; continue }
    if (inString)       continue
    if (ch === openChar)  depth++
    if (ch === closeChar) depth--
    if (depth === 0)    { endIndex = i + 1; break }
  }

  if (endIndex === -1) throw new Error('Response was cut off — JSON incomplete')
  return JSON.parse(text.slice(0, endIndex))
}

// Fetches a single batch of questions (max 5 at a time)
const BATCH_SIZE = 5

async function fetchBatch(apiKey, prompt, batchNum, batchSize, totalQuestions) {
  const start = batchNum * batchSize + 1
  const end   = Math.min((batchNum + 1) * batchSize, totalQuestions)
  const count = end - start + 1

  const batchPrompt = `${prompt}
IMPORTANT: Return ONLY ${count} questions (questions ${start} to ${end} of ${totalQuestions}) as a JSON array.`

  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 4096,
      stream: false,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: [
            'You are an expert software engineering interview coach.',
            'Return ONLY a valid JSON array. No markdown. No backticks. No explanation.',
            'Every string must be properly closed with a double quote.',
            'Escape any double quotes inside strings as \\".',
            'Escape newlines as \\n.',
            'Never use backtick characters inside JSON strings.',
            'Keep each explanation under 300 characters.',
          ].join(' ')
        },
        { role: 'user', content: batchPrompt }
      ]
    })
  })

  if (!res.ok) {
    const d = await res.json().catch(() => ({}))
    const msg = d.error?.message || `HTTP ${res.status}`
    if (res.status === 401) throw new Error('invalid_key')
    if (res.status === 429) throw new Error('rate_limit')
    throw new Error(msg)
  }

  const data         = await res.json()
  const text         = data.choices?.[0]?.message?.content || ''
  const finishReason = data.choices?.[0]?.finish_reason

  console.log(`[fetchBatch ${batchNum + 1}] finish_reason:`, finishReason)
  console.log(`[fetchBatch ${batchNum + 1}] raw:`, text)

  if (finishReason === 'length') {
    throw new Error(`Batch ${batchNum + 1} was cut off — try reducing question count`)
  }

  return extractJSON(text)
}

export function useAI() {
  const [apiKey, setApiKey] = useLocalStorage(API_KEY_STORAGE, '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const hasKey = !!apiKey

  const saveKey  = (key) => setApiKey(key)
  const clearKey = ()    => setApiKey('')

  const streamResponse = async (prompt, onChunk, onDone, onError) => {
    if (!apiKey) { onError('no_key'); return }
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          model: GROQ_MODEL,
          max_tokens: 32768,
          stream: true,
          messages: [
            {
              role: 'system',
              content: 'You are an expert software engineering interview coach. Be concise, practical, and technically accurate.'
            },
            { role: 'user', content: prompt }
          ]
        })
      })

      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        const msg = d.error?.message || `HTTP ${res.status}`
        if (res.status === 401) { onError('invalid_key'); return }
        if (res.status === 429) { onError('rate_limit');  return }
        onError(msg); return
      }

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText  = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = decoder.decode(value, { stream: true }).split('\n')
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (raw === '[DONE]') continue
          try {
            const parsed = JSON.parse(raw)
            const delta  = parsed.choices?.[0]?.delta?.content
            if (delta) {
              fullText += delta
              onChunk(fullText)
            }
          } catch {}
        }
      }
      onDone(fullText)
    } catch (err) {
      if (err.name === 'AbortError') return
      onError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchJSON = async (prompt) => {
    if (!apiKey) throw new Error('no_key')

    // Extract total question count from prompt (default 5 if not found)
    const match = prompt.match(/(\d+)\s*questions?/i)
    const totalQuestions = match ? parseInt(match[1]) : 5

    // 5 or fewer → single request, no batching needed
    if (totalQuestions <= BATCH_SIZE) {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          max_tokens: 4096,
          stream: false,
          temperature: 0.3,
          messages: [
            {
              role: 'system',
              content: [
                'You are an expert software engineering interview coach.',
                'Return ONLY a valid JSON array. No markdown. No backticks. No explanation.',
                'Every string must be properly closed with a double quote.',
                'Escape any double quotes inside strings as \\".',
                'Escape newlines as \\n.',
                'Never use backtick characters inside JSON strings.',
                'Keep each explanation under 300 characters.',
              ].join(' ')
            },
            { role: 'user', content: prompt }
          ]
        })
      })

      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        const msg = d.error?.message || `HTTP ${res.status}`
        if (res.status === 401) throw new Error('invalid_key')
        if (res.status === 429) throw new Error('rate_limit')
        throw new Error(msg)
      }

      const data = await res.json()
      const text = data.choices?.[0]?.message?.content || ''
      console.log('[fetchJSON] raw:', text)
      return extractJSON(text)
    }

    // More than 5 questions → batch into groups of BATCH_SIZE (5 per request)
    const numBatches = Math.ceil(totalQuestions / BATCH_SIZE)
    console.log(`[fetchJSON] Batching ${totalQuestions} questions into ${numBatches} requests of ${BATCH_SIZE}`)

    const allQuestions = []
    for (let i = 0; i < numBatches; i++) {
      const batch = await fetchBatch(apiKey, prompt, i, BATCH_SIZE, totalQuestions)
      allQuestions.push(...batch)
      // Small delay between batches to avoid rate limiting
      if (i < numBatches - 1) {
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    }

    return allQuestions
  }

  const abort = () => {
    if (abortRef.current) abortRef.current.abort()
  }

  return {
    apiKey,
    hasKey,
    saveKey,
    clearKey,
    streamResponse,
    fetchJSON,
    isLoading,
    error,
    abort
  }
}