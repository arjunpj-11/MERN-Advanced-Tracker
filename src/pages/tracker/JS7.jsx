import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'js7'
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
export default function JS7() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'ES6+ & Extras'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="ES6+ Features & Coding Problems" subtitle="Modern JS syntax + common interview coding problems" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="✦" title="ES6+ Syntax" defaultOpen>
        {ci('e1','Template literals — backticks, expressions, multi-line')}
        {ci('e2','Optional chaining ?. — safe property access')}
        {ci('e3','Nullish coalescing ?? — null/undefined only')}
        {ci('e4','Map & Set — when to use over Object/Array')}
        {ci('e5','WeakMap & WeakSet')}
        {ci('e6','Symbol & BigInt (basic idea)')}
        {ci('e7','Logical assignment operators — &&=, ||=, ??=',null,true)}
        {ci('e8','Array.prototype.toSorted(), toReversed(), with() — non-mutating ES2023',null,true)}
        {ci('e9','Intl API — Intl.DateTimeFormat, Intl.NumberFormat, Intl.Collator')}
      </SectionCard>
      <SectionCard icon="🧪" title="Coding Problems">
        {ci('cp1','Reverse a string / array')}
        {ci('cp2','Palindrome check')}
        {ci('cp3','Two Sum — hash map approach O(n)',null,true)}
        {ci('cp4','Valid parentheses — stack approach')}
        {ci('cp5','Flatten nested array — recursive & flat()')}
        {ci('cp6','Deep clone an object')}
        {ci('cp7','Debounce implementation',null,true)}
        {ci('cp8','Testing basics — Jest, unit testing concepts')}
      </SectionCard>
    </div>
  )
}