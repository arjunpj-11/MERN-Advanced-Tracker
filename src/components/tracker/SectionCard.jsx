import { useState } from 'react'

export default function SectionCard({ icon, title, count, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`section-card ${open ? 'open' : ''}`}>
      <div className="section-head" onClick={() => setOpen(!open)}>
        <span style={{ fontSize: 15 }}>{icon}</span>
        <span className="section-title">{title}</span>
        {count !== undefined && (
          <span className="section-count">{count}</span>
        )}
        <span className="section-chevron">▶</span>
      </div>
      <div className="section-body">
        {children}
      </div>
    </div>
  )
}