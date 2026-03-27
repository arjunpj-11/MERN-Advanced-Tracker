import { useState, useMemo } from 'react'
import { MOCK_CATEGORIES, DIFFICULTIES, QUESTION_COUNTS, COMPLETED_TOPICS_CARD } from '../../data/mockTestConfig'
import { useProgress } from '../../hooks/useProgress'
import { ALL_PAGE_ITEMS } from '../../data/topics'
import { OV_META, SIDEBAR_CONFIG } from '../../data/sidebarConfig'

export default function MockTestHome({ onStart, isLoading }) {
  const [selectedCat, setSelectedCat] = useState(null)
  const [difficulty, setDifficulty] = useState('medium')
  const [count, setCount] = useState(10)

  const { getPageStats } = useProgress()

  const completedTopicLabels = useMemo(() => {
    const labels = []
    ALL_PAGE_ITEMS.forEach(page => {
      const stats = getPageStats(page.pageId, page.items)
      if (stats.pct === 100) {
        const meta = OV_META.find(m => m.id === page.pageId)
        if (meta) {
          const groupObj = SIDEBAR_CONFIG.find(g => g.items.some(i => i.id === page.pageId))
          const groupName = groupObj ? groupObj.group : page.cat
          labels.push(`${groupName} - ${meta.label}`)
        }
      }
    })
    return labels
  }, [getPageStats])

  const hasCompletedTopics = completedTopicLabels.length > 0
  const canStart = selectedCat && !isLoading && (selectedCat.id !== 'completed' || hasCompletedTopics)

  return (
    <div>
      <div className="mock-home-hero">
        <h1>🎯 <span>Mock Interview</span> Test</h1>
        <p>AI-generated questions · Instant feedback · Track your weak areas</p>
      </div>

      <div className="mock-config-title">Select Topic</div>
      <div className="mock-category-grid">
        <div
          className={`mock-category-card ${selectedCat?.id === COMPLETED_TOPICS_CARD.id ? 'selected' : ''}`}
          onClick={() => setSelectedCat({ ...COMPLETED_TOPICS_CARD, topics: completedTopicLabels })}
        >
          <div className="mock-cat-icon">{COMPLETED_TOPICS_CARD.icon}</div>
          <div className="mock-cat-name">{COMPLETED_TOPICS_CARD.name}</div>
          <div className="mock-cat-count">
            {hasCompletedTopics ? `${completedTopicLabels.length} eligible topics` : 'Locked (Need 100% on a topic)'}
          </div>
        </div>

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
            ? `🚀 Start ${count}-Question ${selectedCat?.name.replace(' Test', '')} Test`
            : selectedCat?.id === 'completed' && !hasCompletedTopics
              ? 'Complete some topics first to unlock this test.'
              : '← Select a topic to begin'}
      </button>
    </div>
  )
}