import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'node6'
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
export default function Node6() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'HTTP Deep Dive & Advanced Node'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="HTTP Deep Dive & Advanced Node" subtitle="HTTP methods, OPTIONS, preflight, REST principles" tags={['node']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🛰" title="HTTP Deep Dive ⭐" defaultOpen>
        {ci('h1','All 9 HTTP methods — GET POST PUT PATCH DELETE HEAD OPTIONS CONNECT TRACE','HEAD: like GET but no body · OPTIONS: describe communication options · CONNECT: tunnel')}
        {ci('h2','OPTIONS preflight request in CORS','Triggered for non-simple methods or custom headers · app.options("*", cors())',true)}
        {ci('h3','Simple vs non-simple (preflighted) CORS requests','Simple: GET/POST with basic headers · Non-simple: custom headers, PUT, DELETE triggers preflight')}
        {ci('h4','HTTP caching headers — ETag, Last-Modified, Cache-Control, Expires')}
        {ci('h5','Keep-Alive connections — reuse TCP connection for multiple requests')}
        {ci('h6','HTTP/2 features — multiplexing, server push, header compression')}
        {ci('h7','REST constraints — stateless, client-server, cacheable, layered, uniform interface')}
        {ci('h8','Idempotency in REST — which methods are idempotent')}
      </SectionCard>
    </div>
  )
}