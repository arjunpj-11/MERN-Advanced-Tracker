import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'js5'
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
export default function JS5() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'DOM & Browser APIs'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="DOM & Browser APIs" subtitle="Frontend-specific knowledge for UI roles" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🌐" title="DOM & Events" defaultOpen>
        {ci('d1','DOM selection — querySelector, getElementById, querySelectorAll')}
        {ci('d2','Event handling — addEventListener, removeEventListener')}
        {ci('d3','Event bubbling & capturing','Bubbling: child→parent · Capturing: parent→child · stopPropagation',true)}
        {ci('d4','Event delegation — attach to parent, target children',null,true)}
        {ci('d5','LocalStorage vs SessionStorage vs Cookies','localStorage: persistent · sessionStorage: tab-scoped · cookies: server-sent')}
        {ci('d6','Browser rendering process — parse → style → layout → paint → composite')}
        {ci('d7','HTTP basics, REST APIs, JSON, CORS')}
        {ci('d8','Lazy loading — images, code splitting')}
        {ci('d9','AbortController — cancel fetch requests',null,true)}
        {ci('d10','document.createDocumentFragment() — batch DOM updates for performance')}
        {ci('d11','CustomEvent — create and dispatch custom events')}
        {ci('d12','IntersectionObserver & MutationObserver',null,true)}
      </SectionCard>
    </div>
  )
}