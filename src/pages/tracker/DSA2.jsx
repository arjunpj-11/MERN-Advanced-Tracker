import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa2'
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
export default function DSA2() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Linked List, Stack & Queue'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Linked List, Stack & Queue" subtitle="Pointer manipulation and classic patterns" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="⛓" title="Linked List" defaultOpen>
        {ci('ll1','Singly, Doubly, Circular linked list — theory')}
        {ci('ll2','Reverse linked list — iterative & recursive',null,true)}
        {ci('ll3','Detect cycle — Floyd\'s tortoise & hare',null,true)}
        {ci('ll4','Find middle — slow/fast pointers')}
        {ci('ll5','Merge two sorted lists')}
        {ci('ll6','Remove nth node from end')}
        {ci('ll7','LRU Cache — doubly LL + HashMap')}
      </SectionCard>
      <SectionCard icon="🥞" title="Stack & Queue">
        {ci('sq1','Stack — LIFO, implementation (array/LL)')}
        {ci('sq2','Valid parentheses — stack approach',null,true)}
        {ci('sq3','Next greater element, min stack')}
        {ci('sq4','Queue — FIFO, circular queue, deque',null,true)}
        {ci('sq5','Priority Queue — heap-based')}
      </SectionCard>
    </div>
  )
}