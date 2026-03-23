import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'ts2'
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
export default function TS2() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Generics & Advanced Types'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Generics & Advanced Types" subtitle="Top interview topic — must know deeply" tags={['ts']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🧬" title="Generics ⭐ Top Topic" defaultOpen>
        {ci('g1','Generic functions — <T> syntax')}
        {ci('g2','Generic interfaces & classes')}
        {ci('g3','Generic constraints with extends')}
        {ci('g4','keyof operator — T[K] indexed access types',null,true)}
        {ci('g5','Conditional types: T extends U ? X : Y')}
        {ci('g6','Mapped types — transform object type properties')}
        {ci('g7','typeof in type context')}
        {ci('g8','infer keyword — extract types from conditional types','type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never',true)}
      </SectionCard>
      <SectionCard icon="🛡" title="Type Guards & Narrowing ⭐">
        {ci('tg1','typeof, instanceof, in operator guards')}
        {ci('tg2','Custom type predicates: val is Type')}
        {ci('tg3','Discriminated unions — switch on kind field',null,true)}
        {ci('tg4','Narrowing unknown types safely')}
        {ci('tg5','Typing async functions, Promises, DOM events')}
        {ci('tg6','Typing fetch/axios API responses')}
      </SectionCard>
    </div>
  )
}