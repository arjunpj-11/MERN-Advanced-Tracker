export default function PageHeader({ title, subtitle, tags = [] }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {tags.length > 0 && (
        <div className="page-header-meta">
          {tags.map(tag => (
            <span key={tag} className={`tag tag-${tag.toLowerCase()}`}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}