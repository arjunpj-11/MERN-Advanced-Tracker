import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa9'
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
export default function DSA9() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Advanced DSA Concepts'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Advanced DSA & Core CS Concepts" subtitle="Hard topics, system-level concepts, and interview differentiators" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="📚" title="Advanced Stack & Queue" defaultOpen>
        {ci('sq1','Monotonic Stack ⭐ — maintains increasing/decreasing order','Used in Next Greater Element, Histogram problems',true)}
        {ci('sq2','Monotonic Queue ⭐ — sliding window optimization','Used in sliding window max/min problems',true)}
        {ci('sq3','Bounded Queue — fixed capacity queue (circular queue)','Used in buffers, producer-consumer problems')}
      </SectionCard>
      <SectionCard icon="🧠" title="Memory & System Concepts ⭐⭐">
        {ci('mem1','Static vs Dynamic Memory Allocation ⭐','Stack vs Heap memory')}
        {ci('mem2','Memory Pool — pre-allocated memory reuse','Used in game engines, high-performance systems')}
        {ci('mem3','Virtual Memory ⭐ — abstraction over physical memory','Paging, swapping, address translation')}
      </SectionCard>
      <SectionCard icon="🔤" title="Character Encoding & Strings">
        {ci('str1','ASCII ⭐ — 7-bit character encoding')}
        {ci('str2','UTF-8 ⭐⭐ — variable-length encoding','Supports all Unicode characters')}
        {ci('str3','Escape Sequences — \\n, \\t, \\\\, etc')}
      </SectionCard>
      <SectionCard icon="📊" title="Advanced Arrays">
        {ci('arr1','Sparse Array ⭐ — store only non-zero values','Used in large datasets, matrices')}
      </SectionCard>
      <SectionCard icon="🕸" title="Advanced Graph Algorithms ⭐⭐">
        {ci('g1','Tarjan\'s Algorithm ⭐⭐ — SCC in single DFS','Uses low-link values',true)}
        {ci('g2','Kosaraju\'s Algorithm ⭐ — SCC using 2 DFS')}
        {ci('g3','Bellman-Ford Deep Dive ⭐⭐','Edge relaxation, negative cycle detection')}
      </SectionCard>
      <SectionCard icon="🔗" title="Union-Find (Advanced) ⭐">
        {ci('uf1','Path Compression ⭐ — flatten tree')}
        {ci('uf2','Union by Rank ⭐ — attach smaller tree under larger')}
        {ci('uf3','Amortized Time Complexity ~ O(α(N))','Nearly constant time')}
      </SectionCard>
      <SectionCard icon="💡" title="Interview Focus & Tricks">
        <div className="info-box info-green">Advanced DSA = Patterns + Optimization + System Knowledge</div>
        {ci('if1','Recognize monotonic patterns in problems')}
        {ci('if2','Know when to use Tarjan vs Kosaraju')}
        {ci('if3','Understand memory vs performance trade-offs')}
        {ci('if4','Master Union-Find for graphs & dynamic connectivity')}
      </SectionCard>
    </div>
  )
}