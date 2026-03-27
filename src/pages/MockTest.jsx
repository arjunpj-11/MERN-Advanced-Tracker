import { useState } from 'react'
import { useAI } from '../hooks/useAI'
import MockTestHome from '../components/mocktest/MockTestHome'
import MockTestSession from '../components/mocktest/MockTestSession'
import { mockQuestionPrompt } from '../utils/aiPrompts'

export default function MockTest() {
  const [phase, setPhase] = useState('home') // home | loading | session
  const [questions, setQuestions] = useState([])
  const [loadError, setLoadError] = useState(null)
  const ai = useAI()

  const handleStart = async (category, difficulty, count) => {
    if (!ai.hasKey) {
      setLoadError('Please add your Groq API key first (click ✦ Setup AI in topbar)')
      return
    }
    setPhase('loading')
    setLoadError(null)

    let selectedTopics = category.topics
    if (category.id === 'completed') {
      selectedTopics = [...category.topics].sort(() => 0.5 - Math.random())
    }
    const topicStr = selectedTopics.slice(0, 5).join(', ')
    const prompt = mockQuestionPrompt(`${category.name}: ${topicStr}`, difficulty, count)

    try {
      const data = await ai.fetchJSON(prompt)
      if (!Array.isArray(data) || data.length === 0) throw new Error('Invalid response format')
      setQuestions(data)
      setPhase('session')
    } catch (err) {
      setLoadError(err.message || 'Failed to generate questions. Please try again.')
      setPhase('home')
    }
  }

  return (
    <div className="page-content mock-test-page">
      {phase === 'home' || phase === 'loading' ? (
        <>
          <MockTestHome
            onStart={handleStart}
            isLoading={phase === 'loading'}
          />
          {loadError && (
            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.3)',
              borderRadius: 10, color: 'var(--red)', fontSize: 13
            }}>
              ⚠️ {loadError}
            </div>
          )}
        </>
      ) : (
        <MockTestSession
          questions={questions}
          onBack={() => { setPhase('home'); setQuestions([]) }}
        />
      )}
    </div>
  )
}