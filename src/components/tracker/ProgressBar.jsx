export default function ProgressBar({ done, total }) {
  const pct = total ? Math.round(done / total * 100) : 0
  return (
    <div className="prog-bar-wrap">
      <div className="prog-bar-label">
        <span>{done} / {total} completed</span>
        <span>{pct}%</span>
      </div>
      <div className="prog-bar">
        <div className="prog-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}