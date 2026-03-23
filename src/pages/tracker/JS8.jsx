import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'js8'
const PAGE_ITEMS = ALL_PAGE_ITEMS.find(p => p.pageId === PAGE_ID)
function CI({ id, label, sub, star, pageId, toggle, isChecked, openAI, context }) {
  const checked = isChecked(pageId, id)
  return (
    <div className={`check-item ${checked ? 'done' : ''}`} onClick={() => toggle(pageId, id)}>
      <div className="check-box" />
      <div style={{ flex: 1 }}><div className="check-label">{label} {star && <span className="diff-star">⭐</span>}</div>{sub && <div className="check-sub">{sub}</div>}</div>
      <button className="ai-btn" onClick={e => { e.stopPropagation(); openAI(label, context) }}>✦</button>
    </div>
  )
}
export default function JS8() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Memory, Security & Web'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Memory, Security & Web Concepts" subtitle="Performance, security, browser APIs — important for frontend roles" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🏗" title="Memory & Performance" defaultOpen>
        {ci('m1','Garbage collection — mark & sweep algorithm','Objects with no references are collected · WeakMap/WeakSet enable GC')}
        {ci('m2','Memory leaks — 5 common causes','Global vars · Detached DOM · Closures retaining refs · Timers · Event listeners')}
        {ci('m3','Performance optimization — reduce re-renders, batch DOM updates')}
        {ci('m4','Lazy loading — images (loading="lazy"), code splitting (dynamic import)')}
        {ci('m5','Web Workers — run JS in background thread without blocking UI')}
        {ci('m6','requestAnimationFrame — smooth animations, 60fps')}
        {ci('m7','Reflow vs Repaint — layout changes trigger reflow (expensive)')}
      </SectionCard>
      <SectionCard icon="🔐" title="Security Basics">
        {ci('s1','XSS (Cross-Site Scripting) — inject malicious scripts, prevent with escaping')}
        {ci('s2','CSRF (Cross-Site Request Forgery) — forge authenticated requests, prevent with CSRF tokens')}
        {ci('s3','Content Security Policy (CSP) headers')}
        {ci('s4','Input validation & sanitization — never trust user input')}
        {ci('s5','HTTPS, CORS, SameSite cookies')}
        {ci('s6','SQL/NoSQL injection prevention')}
      </SectionCard>
      <SectionCard icon="🌐" title="Web Concepts & Browser APIs">
        {ci('w1','HTTP/HTTPS — request/response, methods, status codes')}
        {ci('w2','HTTP/1.1 vs HTTP/2 vs HTTP/3 — multiplexing, compression')}
        {ci('w3','Browser rendering pipeline — parse HTML → CSSOM → Render tree → Layout → Paint')}
        {ci('w4','Critical rendering path optimization — defer, async scripts')}
        {ci('w5','Service Workers — offline support, caching (PWA)')}
        {ci('w6','IndexedDB — client-side database for large structured data')}
        {ci('w7','Cookies vs localStorage vs sessionStorage — differences & when to use')}
        {ci('w8','Functional programming — pure functions, immutability, composition')}
        {ci('w9','Design patterns — Factory, Singleton, Observer, Module')}
        {ci('w10','Testing basics — unit tests with Jest, TDD concepts')}
      </SectionCard>
    </div>
  )
}