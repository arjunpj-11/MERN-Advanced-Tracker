import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'

const PAGE_ID = 'js2'
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

export default function JS2() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'JS Core Concepts'
  const ci = (id, label, sub, star) =>
    <CI key={id} id={id} label={label} sub={sub} star={star}
      pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />

  return (
    <div className="page-content">
      <PageHeader title="Core Concepts" subtitle="Very important for interviews — interviewers love these" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />

      <SectionCard icon="🧠" title="Execution Context & Call Stack" defaultOpen>
        <div className="info-box info-blue">JS is single-threaded. Global EC is created first, then function ECs stack on top (LIFO). Each EC has: Variable Environment, Scope Chain, this binding.</div>
        {ci('ec1','Execution Context — creation phase vs execution phase')}
        {ci('ec2','Call Stack — LIFO, stack overflow')}
        {ci('ec3','Temporal Dead Zone (TDZ) — let/const before declaration')}
        {ci('ec4','Lexical Scope — where function is defined, not called')}
      </SectionCard>

      <SectionCard icon="🔒" title="Closures ⭐ Most Asked">
        <div className="info-box info-yellow">Closure = function retains access to its outer scope even after the outer function returned. Used for data privacy, factory functions, memoization.</div>
        {ci('cl1','What is a closure — definition & example',null,true)}
        {ci('cl2','Practical uses: data privacy, factory functions')}
        {ci('cl3','var vs let closure trap in loops',null,true)}
        {ci('cl4','Module pattern using closures')}
      </SectionCard>

      <SectionCard icon="🔄" title="Event Loop ⭐">
        <div className="info-box info-yellow">Order: Sync → Microtasks (Promise.then, queueMicrotask) → Macrotasks (setTimeout, setInterval). Most asked output-prediction question.</div>
        {ci('el1','Event loop — heap, call stack, task queues')}
        {ci('el2','Microtasks vs Macrotasks — priority order',null,true)}
        {ci('el3','Callback functions & callback hell')}
        {ci('el4','Predict output: setTimeout + Promise.then',null,true)}
        {ci('el5','Event loop starvation — microtask queue never empties','Infinite Promise chain blocks setTimeout · queueMicrotask in loop starves I/O')}
      </SectionCard>
    </div>
  )
}