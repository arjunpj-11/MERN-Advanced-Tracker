import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'mongo2'
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
export default function Mongo2() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'MongoDB Aggregation & Design'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Aggregation & Schema Design" subtitle="Pipeline, $lookup, design patterns, scaling" tags={['mongo']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="📊" title="Aggregation Pipeline ⭐" defaultOpen>
        {ci('ag1','$match, $group, $project, $sort, $limit, $skip')}
        {ci('ag2','$lookup — join collections',null,true)}
        {ci('ag3','$unwind — flatten arrays')}
        {ci('ag4','$group accumulators: $sum $avg $max $min $push $first')}
        {ci('ag5','$addFields, $set, $unset, $replaceRoot')}
        {ci('ag6','Schema design — embed vs reference decision')}
        {ci('ag7','Relationships: 1-1, 1-Many, Many-Many')}
        {ci('ag8','Denormalization, document size limit (16MB)')}
        {ci('ag9','Soft delete, pagination, caching strategies')}
        {ci('ag10','Sharding — horizontal scaling',null,true)}
        {ci('ag11','Replica sets — replication, high availability')}
        {ci('ag12','CAP theorem — consistency, availability, partition tolerance')}
        {ci('ag13','$facet — run multiple aggregation pipelines in parallel','Single pass through data · Used for search results with facets/filters')}
        {ci('ag14','$setUnion — combine arrays without duplicates')}
        {ci('ag15','$out & $merge — write aggregation results to a collection')}
        {ci('ag16','Single-purpose aggregation — count(), distinct(), estimatedDocumentCount()')}
      </SectionCard>
    </div>
  )
}