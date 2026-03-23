import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'node4'
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
export default function Node4() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Node.js Auth, Security & Deploy'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Auth, Security & Deploy" subtitle="JWT, bcrypt, CORS, rate limiting, PM2" tags={['node']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔐" title="Authentication & Security" defaultOpen>
        {ci('au1','JWT — structure (header.payload.signature)',null,true)}
        {ci('au2','bcrypt — password hashing, salting')}
        {ci('au3','Sessions & cookies vs JWT — stateful vs stateless')}
        {ci('au4','CORS — Cross-Origin Resource Sharing',null,true)}
        {ci('au5','Helmet — sets secure HTTP headers')}
        {ci('au6','Rate limiting — express-rate-limit',null,true)}
        {ci('au7','Input validation — express-validator, joi')}
        {ci('au8','Caching — Redis basics')}
        {ci('au9','Compression — gzip responses')}
        {ci('au10','dotenv — environment variable management')}
        {ci('au11','PM2 — process manager, clustering',null,true)}
        {ci('au12','Docker basics, cloud deployment')}
        {ci('au13','Microservices vs Monolith — API Gateway')}
        {ci('au14','GraphQL — basic idea, difference from REST')}
        {ci('au15','Horizontal vs vertical scaling, load balancing')}
        {ci('au16','Jest unit testing & Supertest API testing')}
        {ci('au17','Token introspection — verify access token validity with auth server','OAuth 2.0 introspection endpoint (RFC 7662) · Returns active: true/false')}
        {ci('au18','HTTP OPTIONS method & CORS preflight','Browser sends OPTIONS before cross-origin POST/PUT/DELETE',true)}
      </SectionCard>
    </div>
  )
}