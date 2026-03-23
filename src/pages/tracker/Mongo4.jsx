import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'mongo4'
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
export default function Mongo4() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Advanced MongoDB'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Advanced MongoDB" subtitle="GridFS, Views, capped collections, write concern, profiler, oplog" tags={['mongo']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔬" title="Special Collections & Storage" defaultOpen>
        {ci('sc1','Capped collections — fixed-size circular buffer, auto-deletes oldest','db.createCollection("logs", {capped:true, size:1000000}) · Used for logs, event streams')}
        {ci('sc2','GridFS — store files larger than 16MB BSON limit','Splits files into chunks (255KB default) stored in fs.files + fs.chunks')}
        {ci('sc3','Views (createView) — read-only aggregation-based virtual collections','db.createView("activeUsers", "users", [{$match:{active:true}}])')}
        {ci('sc4','Clustered collections — _id as range index for time-series data','Documents stored in _id order · Better range scan performance · MongoDB 5.3+')}
      </SectionCard>
      <SectionCard icon="⚖" title="Durability & Consistency">
        {ci('dc1','Write concern — control durability of write operations','w:1 (default) · w:"majority" · w:0: fire and forget · j:true: write to journal',true)}
        {ci('dc2','Read concern — control consistency of read operations','local: default · majority: confirmed by majority · linearizable: most consistent')}
        {ci('dc3','Journaling — write-ahead log for crash recovery','MongoDB writes to journal before applying to data files')}
        {ci('dc4','Oplog — operations log for replication','Capped collection (local.oplog.rs) · Change Streams built on top of oplog')}
      </SectionCard>
      <SectionCard icon="🔍" title="Tooling & Admin">
        {ci('ta1','mongodump / mongorestore — backup and restore','mongodump --uri="..." --out=./backup · mongodump for BSON, mongoexport for JSON')}
        {ci('ta2','db.setProfilingLevel() — database profiler for slow query detection','Level 0: off · Level 1: slow queries · Level 2: all operations')}
        {ci('ta3','mongoimport / mongoexport — JSON/CSV data transfer')}
        {ci('ta4','$fill aggregation — fill null or missing values in documents','Linear interpolation or value carry-forward')}
      </SectionCard>
    </div>
  )
}