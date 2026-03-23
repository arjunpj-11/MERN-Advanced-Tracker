
import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa8'
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
export default function DSA8() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Hashing & Bit Manipulation'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Hashing & Bit Manipulation" subtitle="Hash maps, hash sets, and bitwise operations — interview favorites" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔑" title="Hashing Deep Dive ⭐" defaultOpen>
        <div className="info-box info-blue">HashMap gives O(1) average for insert, delete, search. When you see O(n²) brute force, think HashMap for O(n).</div>
        {ci('h1','HashMap — how it works, hash function, collision handling','Chaining (linked list) · Open addressing (linear probing)')}
        {ci('h2','JS Map vs Object — Map preserves insertion order, any key type')}
        {ci('h3','Frequency counter pattern — count occurrences O(n)')}
        {ci('h4','Two Sum — brute O(n²) → HashMap O(n)',null,true)}
        {ci('h5','Anagram check using HashMap')}
        {ci('h6','Group anagrams — sort each word as key')}
        {ci('h7','Longest consecutive sequence — O(n) with HashSet')}
        {ci('h8','Subarray sum equals K — prefix sum + HashMap')}
        {ci('h9','Set — O(1) lookup, no duplicates, intersection/union')}
        {ci('h10','Load factor & rehashing — when HashMap resizes')}
      </SectionCard>
      <SectionCard icon="⚙" title="Bit Manipulation">
        {ci('b1','All 7 bitwise operators — AND, OR, XOR, NOT, <<, >>, >>>')}
        {ci('b2','Check if power of 2 — n & (n-1) === 0')}
        {ci('b3','Check even/odd — n & 1')}
        {ci('b4','Count set bits — Brian Kernighan algorithm')}
        {ci('b5','Single number — XOR trick',null,true)}
        {ci('b6','Get, set, clear, toggle a specific bit')}
        {ci('b7','Swap two numbers using XOR (no temp variable)')}
        {ci('b8','Missing number — XOR with indices')}
        {ci('b9','Number of 1 bits (Hamming weight)')}
        {ci('b10','Reverse bits of a 32-bit integer')}
      </SectionCard>
    </div>
  )
}