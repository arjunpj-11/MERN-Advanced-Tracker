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
    // 1. Reset state (and to notes tab) when new topic opens or switches
    setContent('')
    setError(null)
    setLoading(false)
    if (open) setTab('notes')
  }, [topic])

  useEffect(() => {
    // 2. Fetch notes ONLY if we are in notes tab, have no content, and aren't already loading
    if (open && topic && tab === 'notes' && !content && !loading && !error) {
      fetchNotes()
    }
  }, [open, topic, tab, content, loading, error])

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
      (err) => { setLoading(false); setError(err) }
    )
  }

  const handleTabChange = (newTab) => {
    setTab(newTab)
    if (newTab === 'notes' && !content && !loading) {
      fetchNotes()
    }
  }

  const errorMessage = (err) => {
    if (err === 'no_key')      return { icon: '🔑', title: 'API Key Required',  msg: 'Add your free Groq API key to generate AI study notes.' }
    if (err === 'invalid_key') return { icon: '🔑', title: 'Invalid API Key',   msg: 'Your key was rejected. Please check and update it.' }
    if (err === 'rate_limit')  return { icon: '⏳', title: 'Rate Limit',        msg: 'Free tier limit reached. Wait a moment and regenerate.' }
    return { icon: '⚠️', title: 'Error', msg: err }
  }

  return (
    <>
      <div
        className={`ai-panel-backdrop ${open ? 'visible' : ''}`}
        onClick={onClose}
      />
      <div
        className={`ai-panel ${open ? 'open' : ''}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
      >
        {/* Header */}
        <div className="ai-panel-header" style={{ flexShrink: 0 }}>
          <div className="ai-panel-icon">✦</div>
          <div className="ai-panel-title-wrap">
            <div className="ai-panel-topic">{topic?.label || 'AI Study Notes'}</div>
            <div className="ai-panel-sub">{topic?.context || ''}</div>
          </div>
          <button className="ai-panel-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="ai-panel-tabs" style={{ flexShrink: 0 }}>
          <button
            className={`ai-tab ${tab === 'notes' ? 'active' : ''}`}
            onClick={() => handleTabChange('notes')}
          >
            📖 Study Notes
          </button>
          <button
            className={`ai-tab ${tab === 'chat' ? 'active' : ''}`}
            onClick={() => handleTabChange('chat')}
          >
            💬 Ask Doubts
          </button>
        </div>

        {/* Body — must flex and scroll */}
        {tab === 'notes' ? (
          <>
            <div
              className="ai-panel-body"
              style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}
            >
              {loading && !content && (
                <div className="ai-loading">
                  <div className="ai-loading-dots"><span /><span /><span /></div>
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
            <div className="ai-panel-footer" style={{ flexShrink: 0 }}>
              <span className="ai-footer-note">⚡ Powered by Groq · llama-3.3-70b</span>
              <button className="ai-regen-btn" onClick={fetchNotes}>↻ Regenerate</button>
            </div>
          </>
        ) : (
          /* Chat tab — takes remaining space */
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <AIChat topic={topic} ai={ai} />
          </div>
        )}
      </div>
    </>
  )
}