import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'ts3'
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
export default function TS3() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Utility Types & OOP'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Utility Types & TS in React" subtitle="Must-know utility types and practical TS usage" tags={['ts']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🛠" title="Utility Types ⭐" defaultOpen>
        <div className="info-box info-blue">Partial · Required · Readonly · Pick · Omit · Record · Exclude · Extract · NonNullable · ReturnType · Parameters · Awaited</div>
        {ci('u1','Partial, Required, Readonly')}
        {ci('u2','Pick, Omit, Record',null,true)}
        {ci('u3','Exclude, Extract, NonNullable')}
        {ci('u4','ReturnType, Parameters, Awaited')}
        {ci('u5','TS with React — Props typing, useState<T>, useRef<T>')}
        {ci('u6','Third-party library typing with @types packages')}
        {ci('u7','ES modules in TS (import/export)')}
        {ci('u8','Type erasure — TS compiles to plain JS')}
        {ci('u9','as const — literal type inference, immutable tuple/object','const arr = [1,2,3] as const → readonly [1,2,3] · Prevents widening to number[]',true)}
        {ci('u10','satisfies operator — validate type without widening','const cfg = { ... } satisfies Config · Keeps literal types while ensuring shape compliance',true)}
      </SectionCard>
    </div>
  )
}