import { useState, useRef, useEffect, useContext } from 'react'
import { renderMarkdown } from '../../utils/markdownRenderer'
import { chatPrompt } from '../../utils/aiPrompts'

export default function AIChat({ topic, ai }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `Hi! I'm here to help you understand **${topic?.label}**. Ask me anything — concepts, examples, edge cases, interview tips, or anything else!`
    }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const msg = input.trim()
    if (!msg || thinking) return
    setInput('')
    setThinking(true)

    const userMsg = { role: 'user', content: msg }
    const history = messages.filter(m => m.role !== 'ai' || messages.indexOf(m) > 0)
    setMessages(prev => [...prev, userMsg, { role: 'ai', content: '' }])

    const prompt = chatPrompt(topic?.label, topic?.context, msg, history)

    await ai.streamResponse(
      prompt,
      (text) => {
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'ai', content: text }
          return updated
        })
      },
      () => setThinking(false),
      (err) => {
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'ai',
            content: err === 'no_key'
              ? 'Please add your Groq API key to use AI chat.'
              : `Error: ${err}. Please try again.`
          }
          return updated
        })
        setThinking(false)
      }
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="ai-chat">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role}`}>
            {msg.role === 'ai' ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: msg.content
                    ? renderMarkdown(msg.content) + (thinking && i === messages.length - 1 ? '<span class="ai-cursor"></span>' : '')
                    : '<span class="ai-cursor"></span>'
                }}
              />
            ) : (
              msg.content
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-wrap">
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="Ask a follow-up question... (Enter to send, Shift+Enter for newline)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="chat-send"
          onClick={send}
          disabled={!input.trim() || thinking}
        >
          ↑
        </button>
      </div>
    </div>
  )
}