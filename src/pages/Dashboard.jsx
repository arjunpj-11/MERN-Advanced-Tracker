import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { ALL_PAGE_ITEMS } from '../data/topics'
import { OV_META } from '../data/sidebarConfig'

export default function Dashboard() {
  const navigate = useNavigate()
  const { getTotalStats, getPageStats } = useProgress()
  const stats = getTotalStats(ALL_PAGE_ITEMS)

  return (
    <div className="page-content dashboard">
      <div className="dash-hero">
        <h1>Interview Prep <span>Tracker</span></h1>
        <p>MERN Stack · TypeScript · Next.js · DSA · Complete Roadmap with AI</p>
        <div className="big-stats">
          <div className="big-stat">
            <div className="val">{stats.total}</div>
            <div className="lbl">Topics</div>
          </div>
          <div className="big-stat">
            <div className="val" style={{ color: 'var(--accent2)' }}>{stats.done}</div>
            <div className="lbl">Done</div>
          </div>
          <div className="big-stat">
            <div className="val" style={{ color: 'var(--cyan)' }}>{stats.pct}%</div>
            <div className="lbl">Progress</div>
          </div>
          <div className="big-stat">
            <div className="val" style={{ color: 'var(--text2)' }}>{stats.total - stats.done}</div>
            <div className="lbl">Remaining</div>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        {OV_META.map(item => {
          const page = ALL_PAGE_ITEMS.find(p => p.pageId === item.id)
          const s = page ? getPageStats(item.id, page.items) : { total: 0, done: 0, pct: 0 }
          return (
            <div
              key={item.id}
              className="ov-card"
              onClick={() => navigate(item.path)}
            >
              <div className="ov-icon">{item.icon}</div>
              <div className="ov-name">{item.label}</div>
              <div className="ov-pct-text">{s.done}/{s.total} · {s.pct}%</div>
              <div className="ov-bar">
                <div className="ov-bar-fill" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="dash-info">
        ✦ Click any topic to start studying · Hover a checklist item and click the <strong>✦ button</strong> for AI study notes · Use <strong>Ask Doubts</strong> to chat about any topic · Take a <strong>Mock Test</strong> to assess yourself
      </div>
    </div>
  )
}