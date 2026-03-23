import { useState } from 'react'
import Modal from '../ui/Modal'

export default function AIKeyModal({ open, onClose, ai }) {
  const [input, setInput] = useState(ai.apiKey || '')
  const [error, setError] = useState('')

  const handleSave = () => {
    const val = input.trim()
    if (!val) { setError('Please enter your Groq API key'); return }
    ai.saveKey(val)
    onClose()
  }

  const handleClear = () => {
    ai.clearKey()
    setInput('')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-icon">🔑</div>
      <div className="modal-title">Groq API Key</div>
      <div className="modal-desc">
        Enter your free Groq API key to enable AI study notes, mock test generation, and chat.{' '}
        <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer">
          Get free key →
        </a>
      </div>

      {ai.hasKey && (
        <div className="modal-saved-badge">✓ Key saved</div>
      )}

      <div className="modal-input-wrap">
        <input
          className="modal-input"
          type="password"
          placeholder="gsk_..."
          value={input}
          onChange={e => { setInput(e.target.value); setError('') }}
          onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
          autoFocus
        />
      </div>
      {error && (
        <div style={{ color: 'var(--red)', fontSize: 12, marginBottom: 8 }}>{error}</div>
      )}
      <div className="modal-hint">Format: gsk_xxxxxxxxxxxxxxxxxx</div>

      <div className="modal-actions">
        <button className="modal-btn-primary" onClick={handleSave}>Save Key</button>
        <button className="modal-btn-secondary" onClick={onClose}>Cancel</button>
      </div>

      {ai.hasKey && (
        <button className="modal-clear-btn" onClick={handleClear}>
          Remove saved key
        </button>
      )}
    </Modal>
  )
}