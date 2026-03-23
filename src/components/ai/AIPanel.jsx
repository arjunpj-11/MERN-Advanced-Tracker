import { useState, useEffect } from 'react'
import { renderMarkdown } from '../../utils/markdownRenderer'
import { studyNotesPrompt } from '../../utils/aiPrompts'
import AIChat from './AIChat'

export default function AIPanel({ open, topic, onClose, ai }) {
  const [tab, setTab] = useState('notes')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (open && topic && tab === 'notes') {
      fetchNotes()
    }
  }, [open, topic])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const fetchNotes = () => {
    if (!topic) return
    setLoading(true)
    setContent('')
    setError(null)

    const prompt = studyNotesPrompt(topic.label, topic.context)

    ai.streamResponse(
      prompt,
      (text) => setContent(text),
      () => setLoading(false),
      (err) => {
        setLoading(false)
        setError(err)
      }
    )
  }

  const errorMessage = (err) => {
    if (err === 'no_key') return { icon: '🔑', title: 'API Key Required', msg: 'Add your free Groq API key to generate AI study notes.' }
    if (err === 'invalid_key') return { icon: '🔑', title: 'Invalid API Key', msg: 'Your key was rejected. Please check and update it.' }
    if (err === 'rate_limit') return { icon: '⏳', title: 'Rate Limit', msg: 'Free tier limit reached. Wait a moment and regenerate.' }
    return { icon: '⚠️', title: 'Error', msg: err }
  }

  return (
    <>
      <div
        className={`ai-panel-backdrop ${open ? 'visible' : ''}`}
        onClick={onClose}
      />
      <div className={`ai-panel ${open ? 'open' : ''}`}>
        <div className="ai-panel-header">
          <div className="ai-panel-icon">✦</div>
          <div className="ai-panel-title-wrap">
            <div className="ai-panel-topic">{topic?.label || 'AI Study Notes'}</div>
            <div className="ai-panel-sub">{topic?.context || ''}</div>
          </div>
          <button className="ai-panel-close" onClick={onClose}>✕</button>
        </div>

        <div className="ai-panel-tabs">
          <button
            className={`ai-tab ${tab === 'notes' ? 'active' : ''}`}
            onClick={() => setTab('notes')}
          >
            📖 Study Notes
          </button>
          <button
            className={`ai-tab ${tab === 'chat' ? 'active' : ''}`}
            onClick={() => setTab('chat')}
          >
            💬 Ask Doubts
          </button>
        </div>

        {tab === 'notes' ? (
          <>
            <div className="ai-panel-body">
              {loading && !content && (
                <div className="ai-loading">
                  <div className="ai-loading-dots">
                    <span /><span /><span />
                  </div>
                  <div className="ai-loading-text">Generating study notes…</div>
                </div>
              )}

              {error && !content && (
                <div className="ai-error">
                  <div className="ai-error-icon">{errorMessage(error).icon}</div>
                  <strong>{errorMessage(error).title}</strong>
                  <br /><br />
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>
                    {errorMessage(error).msg}
                  </span>
                </div>
              )}

              {content && (
                <div
                  className="ai-content"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(content) +
                      (loading ? '<span class="ai-cursor"></span>' : '')
                  }}
                />
              )}
            </div>

            <div className="ai-panel-footer">
              <span className="ai-footer-note">⚡ Powered by Groq · llama-3.3-70b</span>
              <button className="ai-regen-btn" onClick={fetchNotes}>
                ↻ Regenerate
              </button>
            </div>
          </>
        ) : (
          <AIChat topic={topic} ai={ai} />
        )}
      </div>
    </>
  )
}