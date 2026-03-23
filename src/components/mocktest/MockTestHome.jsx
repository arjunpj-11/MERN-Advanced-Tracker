import { useState } from 'react'
import { MOCK_CATEGORIES, DIFFICULTIES, QUESTION_COUNTS } from '../../data/mockTestConfig'

export default function MockTestHome({ onStart, isLoading }) {
  const [selectedCat, setSelectedCat] = useState(null)
  const [difficulty, setDifficulty] = useState('medium')
  const [count, setCount] = useState(10)

  const canStart = selectedCat && !isLoading

  return (
    <div>
      <div className="mock-home-hero">
        <h1>🎯 <span>Mock Interview</span> Test</h1>
        <p>AI-generated questions · Instant feedback · Track your weak areas</p>
      </div>

      <div className="mock-config-title">Select Topic</div>
      <div className="mock-category-grid">
        {MOCK_CATEGORIES.map(cat => (
          <div
            key={cat.id}
            className={`mock-category-card ${selectedCat?.id === cat.id ? 'selected' : ''}`}
            onClick={() => setSelectedCat(cat)}
          >
            <div className="mock-cat-icon">{cat.icon}</div>
            <div className="mock-cat-name">{cat.name}</div>
            <div className="mock-cat-count">{cat.topics.length} subtopics</div>
          </div>
        ))}
      </div>

      <div className="mock-config-section">
        <div className="mock-config-title">Difficulty</div>
        <div className="mock-config-row">
          {DIFFICULTIES.map(d => (
            <button
              key={d.id}
              className={`mock-config-chip ${difficulty === d.id ? 'selected' : ''}`}
              onClick={() => setDifficulty(d.id)}
            >
              {d.label} — {d.desc}
            </button>
          ))}
        </div>
      </div>

      <div className="mock-config-section">
        <div className="mock-config-title">Number of Questions</div>
        <div className="mock-config-row">
          {QUESTION_COUNTS.map(n => (
            <button
              key={n}
              className={`mock-config-chip ${count === n ? 'selected' : ''}`}
              onClick={() => setCount(n)}
            >
              {n} Questions
            </button>
          ))}
        </div>
      </div>

      <button
        className="start-test-btn"
        disabled={!canStart}
        onClick={() => onStart(selectedCat, difficulty, count)}
      >
        {isLoading
          ? '⏳ Generating Questions…'
          : canStart
            ? `🚀 Start ${count}-Question ${selectedCat?.name} Test`
            : '← Select a topic to begin'}
      </button>
    </div>
  )
}