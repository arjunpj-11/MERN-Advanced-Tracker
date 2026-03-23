import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'js3'
const PAGE_ITEMS = ALL_PAGE_ITEMS.find(p => p.pageId === PAGE_ID)
function CI({ id, label, sub, star, pageId, toggle, isChecked, openAI, context }) {
  const checked = isChecked(pageId, id)
  return (
    <div className={`check-item ${checked ? 'done' : ''}`} onClick={() => toggle(pageId, id)}>
      <div className="check-box" />
      <div style={{ flex: 1 }}>
        <div className="check-label">{label} {star && <span className="diff-star">⭐</span>}</div>
        {sub && <div className="check-sub">{sub}</div>}
      </div>
      <button className="ai-btn" onClick={e => { e.stopPropagation(); openAI(label, context) }}>✦</button>
    </div>
  )
}
export default function JS3() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Objects & Arrays'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Objects & Arrays" subtitle="Deep knowledge needed — built-in methods + patterns" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="▦" title="Array Methods" defaultOpen>
        {ci('am1','map / filter / reduce — differences & use cases',null,true)}
        {ci('am2','forEach vs map — forEach returns undefined')}
        {ci('am3','find, findIndex, some, every, includes')}
        {ci('am4','slice vs splice — non-mutating vs mutating')}
        {ci('am5','flat, flatMap — flatten nested arrays')}
        {ci('am6','sort with comparator — numbers & strings')}
        {ci('am7','Array.from(), Array.isArray(), Array.of()')}
      </SectionCard>
      <SectionCard icon="📦" title="Object Methods">
        {ci('om1','Object.keys(), .values(), .entries()')}
        {ci('om2','Object.assign() vs spread — shallow copy')}
        {ci('om3','Object.freeze() vs Object.seal()')}
        {ci('om4','Object.create(), Object.defineProperty()')}
        {ci('om5','Deep copy vs shallow copy — structuredClone() vs JSON',null,true)}
        {ci('om6','Destructuring — object & array with defaults, rename, nested')}
        {ci('om7','Spread & Rest operators')}
        {ci('om8','structuredClone() — deep clone with full type support','Handles Date, Map, Set, ArrayBuffer · JSON fails on undefined, functions, circular refs',true)}
      </SectionCard>
    </div>
  )
}