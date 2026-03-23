export default function CodeBlock({ lang = 'js', children }) {
  return (
    <div className="code-block">
      <span className="lang-tag">{lang}</span>
      <pre style={{ margin: 0, fontFamily: 'var(--font-mono)' }}>
        {children}
      </pre>
    </div>
  )
}