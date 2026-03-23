import { NavLink, useLocation } from 'react-router-dom'
import { SIDEBAR_CONFIG } from '../../data/sidebarConfig'
import { useProgress } from '../../hooks/useProgress'
import { ALL_PAGE_ITEMS } from '../../data/topics'

export default function Sidebar({ open, onClose }) {
  const location = useLocation()
  const { getPageStats } = useProgress()

  const getProgress = (pageId) => {
    const page = ALL_PAGE_ITEMS.find(p => p.pageId === pageId)
    if (!page) return 0
    const { pct } = getPageStats(pageId, page.items)
    return pct
  }

  const getDotColor = (pct) => {
    if (pct === 100) return 'var(--green)'
    if (pct > 0) return 'var(--yellow)'
    return 'var(--border2)'
  }

  const getCatProgress = (cat) => {
    if (!cat) return 0
    const pages = ALL_PAGE_ITEMS.filter(p => p.cat === cat)
    if (!pages.length) return 0
    let total = 0, done = 0
    pages.forEach(p => {
      const { total: t, done: d } = getPageStats(p.pageId, p.items)
      total += t; done += d
    })
    return total ? Math.round(done / total * 100) : 0
  }

  return (
    <nav className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <div className="brand-icon">⚡</div>
            <span className="brand-title">Interview Tracker</span>
          </div>
          <span className="brand-sub">MERN · TS · Next.js · DSA</span>
        </div>
        <button className="sidebar-close" onClick={onClose}>✕</button>
      </div>

      <div className="sidebar-inner">
        {SIDEBAR_CONFIG.map((group) => (
          <div key={group.group}>
            <div className="sidebar-group-label">{group.group}</div>

            {group.items.map((item) => {
              const pct = item.id !== 'overview' ? getProgress(item.id) : null
              const isActive = location.pathname === item.path ||
                (item.path === '/' && location.pathname === '/')

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.isNew && <span className="nav-badge">NEW</span>}
                  {pct !== null && (
                    <span
                      className="nav-dot"
                      style={{ background: getDotColor(pct) }}
                    />
                  )}
                </NavLink>
              )
            })}

            {group.cat && (
              <div className="sidebar-prog">
                <div
                  className="sidebar-prog-fill"
                  style={{ width: `${getCatProgress(group.cat)}%` }}
                />
              </div>
            )}
          </div>
        ))}

        <div style={{ padding: '16px 18px 0' }}>
          <NavLink
            to="/mock-test"
            className={`nav-item ${location.pathname === '/mock-test' ? 'active' : ''}`}
            style={{ borderRadius: '8px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', marginBottom: '4px' }}
          >
            <span className="nav-icon">🎯</span>
            <span className="nav-label" style={{ color: 'var(--yellow)' }}>Mock Test</span>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}