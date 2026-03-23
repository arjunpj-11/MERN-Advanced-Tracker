import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'node3'
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
export default function Node3() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Express & REST APIs'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Express.js & REST APIs" subtitle="Routing, middleware, REST design, MVC" tags={['node']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🚂" title="Express Core" defaultOpen>
        {ci('ex1','What is Express — minimal Node.js web framework')}
        {ci('ex2','Creating server — app.listen(), HTTP methods')}
        {ci('ex3','Routing — route params (:id), query params (?key=val)')}
        {ci('ex4','Middleware — (req, res, next)',null,true)}
        {ci('ex5','Built-in middleware: express.json(), express.urlencoded()')}
        {ci('ex6','Error-handling middleware — 4 params (err, req, res, next)',null,true)}
        {ci('ex7','Modular routes — Express Router')}
        {ci('ex8','req.params, req.query, req.body / res.json(), res.status()')}
        {ci('ex9','MVC architecture — Model, View, Controller',null,true)}
        {ci('ex10','REST principles — stateless, uniform interface')}
        {ci('ex11','HTTP status codes: 200/201/400/401/403/404/500',null,true)}
        {ci('ex12','File upload — Multer')}
        {ci('ex13','Logging — Morgan, Winston')}
        {ci('ex14','Pagination, search & filtering patterns')}
        {ci('ex15','API documentation — Swagger basics')}
        {ci('ex16','WebSockets — Socket.io, real-time apps',null,true)}
        {ci('ex17','app.locals & app.set — application-level settings')}
        {ci('ex18','setHeader vs writeHead — setting HTTP response headers')}
        {ci('ex19','Cron jobs in Node.js — node-cron, node-schedule','cron.schedule("0 * * * *", fn) · Use for: email digests, cleanup tasks')}
        {ci('ex20','API versioning strategies — URL (/v1/), header, query param')}
        {ci('ex21','Idempotency — same request, same result (GET, PUT, DELETE are idempotent)',null,true)}
        {ci('ex22','Content negotiation — server responds based on Accept header')}
      </SectionCard>
    </div>
  )
}