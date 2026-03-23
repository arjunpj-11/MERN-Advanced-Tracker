import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'mongo1'
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
export default function Mongo1() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'MongoDB Core'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="MongoDB Core" subtitle="CRUD, queries, indexing, Mongoose" tags={['mongo']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🍃" title="Basics & CRUD" defaultOpen>
        {ci('m1','What is MongoDB — NoSQL, document-based')}
        {ci('m2','NoSQL vs SQL — differences')}
        {ci('m3','JSON vs BSON',null,true)}
        {ci('m4','Collections & Documents — dynamic schema')}
        {ci('m5','CRUD: insertOne/insertMany, find/findOne')}
        {ci('m6','updateOne/updateMany, deleteOne/deleteMany')}
        {ci('m7','Query operators: $eq $ne $gt $lt $gte $lte $in $nin')}
        {ci('m8','Logical: $and $or $not $nor')}
        {ci('m9','Element: $exists $type, Evaluation: $regex')}
        {ci('m10','Update operators: $set $unset $inc $push $pull $addToSet')}
        {ci('m11','Projection, sort, limit, skip — pagination')}
        {ci('m12','Indexing: single, compound, text, TTL',null,true)}
        {ci('m13','Index trade-offs — faster reads, slower writes')}
        {ci('m14','explain() — query execution plan')}
        {ci('m15','$elemMatch — match array elements against multiple criteria')}
        {ci('m16','$expr — use aggregation expressions in query filter')}
      </SectionCard>
      <SectionCard icon="🌿" title="Mongoose">
        {ci('ms1','Schema definition — types, validators, defaults')}
        {ci('ms2','Embedded docs vs References (ObjectId ref)',null,true)}
        {ci('ms3','populate() — joins in Mongoose')}
        {ci('ms4','Instance methods, statics, virtuals')}
        {ci('ms5','Pre/post middleware hooks — save, findOneAndUpdate')}
        {ci('ms6','lean() — plain JS objects, faster queries')}
        {ci('ms7','Transactions — multi-document ACID')}
      </SectionCard>
    </div>
  )
}