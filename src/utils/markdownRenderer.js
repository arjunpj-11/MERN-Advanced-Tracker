export function renderMarkdown(text) {
  if (!text) return ''
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  let html = esc(text)

  const blocks = []
  html = html.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) => {
    blocks.push(`<pre><code>${code.trim()}</code></pre>`)
    return `\x00CODE${blocks.length - 1}\x00`
  })

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm,  '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm,   '<h2>$1</h2>')
  html = html.replace(/`([^`]+)`/g,   '<code>$1</code>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g,     '<em>$1</em>')
  html = html.replace(/^&gt; (.+)$/gm,  '<blockquote>$1</blockquote>')
  html = html.replace(/^---$/gm,        '<hr>')

  const lines = html.split('\n')
  const result = []
  let inList = false
  for (const line of lines) {
    if (/^[-*] .+/.test(line)) {
      if (!inList) { result.push('<ul>'); inList = true }
      result.push(`<li>${line.replace(/^[-*] /, '')}</li>`)
    } else if (/^\d+\. .+/.test(line)) {
      if (!inList) { result.push('<ul>'); inList = true }
      result.push(`<li>${line.replace(/^\d+\. /, '')}</li>`)
    } else {
      if (inList) { result.push('</ul>'); inList = false }
      result.push(line)
    }
  }
  if (inList) result.push('</ul>')
  html = result.join('\n')

  html = html.split('\n\n').map(block => {
    const t = block.trim()
    if (!t) return ''
    if (/^<[huolbpci]/.test(t) || t.startsWith('\x00CODE')) return t
    return `<p>${t.replace(/\n/g, '<br>')}</p>`
  }).join('\n')

  blocks.forEach((code, i) => {
    html = html.replace(`\x00CODE${i}\x00`, code)
  })
  html = html.replace(/<p>💡([^<]+)<\/p>/g, '<div class="ai-tip">💡$1</div>')

  return html
}