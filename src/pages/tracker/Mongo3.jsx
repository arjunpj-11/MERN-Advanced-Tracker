import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'mongo3'
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
export default function Mongo3() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'MongoDB Security, Perf & Real-World'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="MongoDB Security, Performance & Real-World" subtitle="Production patterns, optimization, security practices" tags={['mongo']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔐" title="Security" defaultOpen>
        {ci('s1','Authentication — MongoDB users, roles, RBAC')}
        {ci('s2','Authorization — role-based access control, least privilege')}
        {ci('s3','Data validation — Mongoose validators, JSON Schema')}
        {ci('s4','NoSQL injection prevention — never pass raw user input to queries')}
        {ci('s5','Encryption at rest and in transit (TLS)')}
        {ci('s6','Audit logging — track who did what')}
      </SectionCard>
      <SectionCard icon="⚡" title="Performance & Optimization">
        {ci('p1','Index optimization — use explain() to analyze queries')}
        {ci('p2','Covered queries — query answered entirely from index','All query fields and projected fields must be in the index',true)}
        {ci('p3','Avoiding full collection scans — always index query fields')}
        {ci('p4','Connection pooling — reuse connections, don\'t create per request')}
        {ci('p5','lean() in Mongoose — plain objects, skip hydration overhead')}
        {ci('p6','Projection — only return needed fields, reduce bandwidth')}
        {ci('p7','Pagination — cursor-based vs skip/limit tradeoffs')}
        {ci('p8','Caching with Redis — cache frequent queries')}
      </SectionCard>
      <SectionCard icon="🌍" title="Real-World Patterns">
        {ci('r1','Soft delete — isDeleted flag instead of actual deletion')}
        {ci('r2','Versioning documents — __v field, optimistic concurrency')}
        {ci('r3','Logging collections — activity/audit trails')}
        {ci('r4','TTL indexes — auto-expire documents (sessions, OTPs)')}
        {ci('r5','Change Streams — react to DB changes in real time')}
        {ci('r6','Multi-document transactions — when & how to use')}
        {ci('r7','Sharding strategies — range-based, hash-based, zone sharding')}
        {ci('r8','Replica sets — primary, secondary, arbiter roles')}
        {ci('r9','MongoDB Atlas — cloud hosting, Atlas Search, Data API')}
      </SectionCard>
    </div>
  )
}