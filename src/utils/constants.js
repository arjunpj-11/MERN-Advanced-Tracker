export const APP_NAME = 'Interview Prep Tracker'
export const API_KEY_STORAGE = 'groq_api_key_v2'
export const TRACKER_KEY = 'tracker_progress_v2'
export const GROQ_MODEL = 'llama-3.3-70b-versatile'
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export const CATEGORIES = {
  js:    { label: 'JavaScript',    color: '#fbbf24' },
  ts:    { label: 'TypeScript',    color: '#60a5fa' },
  react: { label: 'React',         color: '#22d3ee' },
  next:  { label: 'Next.js',       color: '#e8e8f0' },
  node:  { label: 'Node.js',       color: '#34d399' },
  mongo: { label: 'MongoDB',       color: '#a78bfa' },
  dsa:   { label: 'DSA',           color: '#f87171' },
  sql: { label: 'SQL/PostgreSQL', color: '#34d399' },
}