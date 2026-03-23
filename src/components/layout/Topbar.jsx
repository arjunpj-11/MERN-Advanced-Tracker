import { useNavigate } from 'react-router-dom'

export default function Topbar({ onMenuClick, stats, pageName, hasKey, onAIClick }) {
  const navigate = useNavigate()

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="hamburger" onClick={onMenuClick} aria-label="Menu">
          <span /><span /><span />
        </button>
        <span className="topbar-title">Interview Tracker</span>
        {pageName && (
          <span className="topbar-page-name">{pageName}</span>
        )}
      </div>

      <div className="topbar-right">
        <div className="topbar-stats">
          <div className="stat-chip">
            <span className="stat-num">{stats.done}</span>
            <span style={{ color: 'var(--text3)' }}>/</span>
            <span className="stat-num">{stats.total}</span>
          </div>
          <div className="progress-pill">{stats.pct}%</div>
        </div>

        <button
          className="mock-test-btn"
          onClick={() => navigate('/mock-test')}
        >
          🎯 <span>Mock Test</span>
        </button>

        <button
          className={`ai-badge ${hasKey ? 'ready' : ''}`}
          onClick={onAIClick}
          title="Configure AI"
        >
          {hasKey ? '✦ AI Ready' : '✦ Setup AI'}
        </button>
      </div>
    </div>
  )
}