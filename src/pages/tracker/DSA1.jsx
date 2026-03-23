import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa1'
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
export default function DSA1() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Arrays & Strings'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Arrays & Strings" subtitle="Two pointers, sliding window, prefix sum, hashing" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="📊" title="Complexity — Must Know" defaultOpen>
        {ci('c1','Big-O notation — time complexity analysis',null,true)}
        {ci('c2','Space complexity — auxiliary space')}
        {ci('c3','Common complexities: O(1) O(log n) O(n) O(n log n) O(n²)')}
        {ci('c4','Recursion — base case, call stack, memoization',null,true)}
      </SectionCard>
      <SectionCard icon="▦" title="Array Patterns">
        {ci('a1','Traversal, insertion, deletion — complexity')}
        {ci('a2','Two pointers — reverse, two-sum sorted',null,true)}
        {ci('a3','Sliding window — fixed & variable size',null,true)}
        {ci('a4','Prefix sum — range query O(1)')}
        {ci('a5','Kadane\'s algorithm — max subarray sum',null,true)}
        {ci('a6','HashMap / HashTable for O(1) lookups',null,true)}
        {ci('a7','Set — duplicates, intersection, union')}
        {ci('a8','String: palindrome, anagram, pattern matching')}
        {ci('a9','Substring problems — longest without repeat char')}
      </SectionCard>
    </div>
  )
}