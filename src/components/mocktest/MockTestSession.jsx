import { useState, useEffect, useCallback } from 'react'
import QuestionCard from './QuestionCard'
import MockTestResult from './MockTestResult'

export default function MockTestSession({ questions, onBack }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(questions.length * 90)
  const [timeUsed, setTimeUsed] = useState(0)
  const [reviewMode, setReviewMode] = useState(false)

  useEffect(() => {
    if (finished) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); handleFinish(); return 0 }
        return t - 1
      })
      setTimeUsed(u => u + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [finished])

  const handleAnswer = (optIndex) => {
    setAnswers(prev => ({ ...prev, [current]: optIndex }))
    setShowResult(true)
  }

  const handleNext = () => {
    setShowResult(false)
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      handleFinish()
    }
  }

  const handleFinish = () => setFinished(true)

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const isLowTime = timeLeft < 60

  if (finished) {
    return (
      <MockTestResult
        questions={questions}
        answers={Object.values(answers).concat(
          Array(questions.length - Object.keys(answers).length).fill(undefined)
        )}
        timeUsed={timeUsed}
        onRetry={() => {
          setCurrent(0); setAnswers({})
          setShowResult(false); setFinished(false)
          setTimeLeft(questions.length * 90); setTimeUsed(0)
        }}
        onHome={onBack}
      />
    )
  }

  return (
    <div className="mock-session">
      <div className="mock-session-header">
        <div className="mock-progress-info">
          Question {current + 1} / {questions.length} ·{' '}
          {Object.keys(answers).length} answered
        </div>
        <div className={`mock-timer ${isLowTime ? 'danger' : ''}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
        <button className="mock-nav-btn danger" onClick={handleFinish}>
          Finish Early
        </button>
      </div>

      <div className="prog-bar" style={{ marginBottom: 20 }}>
        <div
          className="prog-bar-fill"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <QuestionCard
        question={questions[current]}
        index={current}
        total={questions.length}
        answer={answers[current]}
        onAnswer={handleAnswer}
        showResult={showResult}
      />

      <div className="mock-nav-btns">
        <button
          className="mock-nav-btn secondary"
          onClick={() => { setShowResult(false); setCurrent(Math.max(0, current - 1)) }}
          disabled={current === 0}
        >
          ← Previous
        </button>
        <button
          className="mock-nav-btn primary"
          onClick={handleNext}
        >
          {current === questions.length - 1 ? 'Finish →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}