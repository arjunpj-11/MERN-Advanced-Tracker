import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa4'
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
export default function DSA4() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Searching & Sorting'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Searching & Sorting" subtitle="Binary search variations + all sorting algorithms" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔍" title="Sorting Algorithms" defaultOpen>
        <div className="info-box info-blue">Bubble/Selection/Insertion: O(n²) · Merge Sort: O(n log n) stable · Quick Sort: O(n log n) avg · Heap Sort: O(n log n) in-place</div>
        {ci('so1','Bubble, Selection, Insertion sort — implement')}
        {ci('so2','Merge sort — divide & conquer',null,true)}
        {ci('so3','Quick sort — pivot, partition',null,true)}
        {ci('so4','Heap sort — using max heap')}
        {ci('so5','Counting sort — O(n+k) for integers')}
      </SectionCard>
      <SectionCard icon="🔎" title="Binary Search ⭐">
        {ci('bs1','Standard binary search — O(log n)')}
        {ci('bs2','First/last occurrence — leftmost, rightmost')}
        {ci('bs3','Search in rotated sorted array',null,true)}
        {ci('bs4','Find kth largest — QuickSelect O(n) avg')}
        {ci('bs5','Bit manipulation: AND, OR, XOR, count set bits')}
      </SectionCard>
    </div>
  )
}