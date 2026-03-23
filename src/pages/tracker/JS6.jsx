import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'js6'
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
export default function JS6() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Async JavaScript'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Async JavaScript" subtitle="Super important — must be crystal clear" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🤝" title="Promises & Async/Await" defaultOpen>
        <div className="info-box info-yellow">Promise.all fails fast · allSettled waits for all · race returns first (resolve or reject) · any returns first resolve only</div>
        {ci('as1','Callbacks — definition & callback hell problem')}
        {ci('as2','Promise states: pending, fulfilled, rejected')}
        {ci('as3','Promise chaining — .then().catch().finally()')}
        {ci('as4','Promise.all vs allSettled vs race vs any',null,true)}
        {ci('as5','async/await — clean async code')}
        {ci('as6','Error handling with try/catch in async functions')}
        {ci('as7','Fetch API & Axios — difference & usage')}
        {ci('as8','Parallel execution: Promise.all with async/await')}
        {ci('as9','AggregateError — thrown by Promise.any when all promises reject','err.errors[] holds all rejection reasons')}
      </SectionCard>
    </div>
  )
}