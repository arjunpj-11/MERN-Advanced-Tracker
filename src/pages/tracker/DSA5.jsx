import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa5'
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
export default function DSA5() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'DP, Greedy & Patterns'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="DP, Backtracking & Patterns" subtitle="Dynamic programming, greedy, recursion, advanced structures" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="◈" title="Dynamic Programming ⭐" defaultOpen>
        <div className="info-box info-yellow">DP = recursion + caching. Identify: overlapping subproblems + optimal substructure. Top-down = memoization. Bottom-up = tabulation.</div>
        {ci('dp0','Identify DP problems — overlapping subproblems + optimal substructure')}
        {ci('dp1','Fibonacci — memoization vs tabulation')}
        {ci('dp2','Climbing stairs / House robber')}
        {ci('dp3','Coin change — minimum coins',null,true)}
        {ci('dp4','0/1 Knapsack',null,true)}
        {ci('dp5','Longest Common Subsequence (LCS)',null,true)}
        {ci('dp6','Longest Increasing Subsequence (LIS)')}
        {ci('dp7','Edit distance (Levenshtein)')}
        {ci('dp8','DP on grids — unique paths, min path sum')}
        {ci('dp9','Kadane\'s algorithm — max subarray (DP approach)')}
      </SectionCard>
      <SectionCard icon="🔙" title="Backtracking & Greedy">
        {ci('bt1','Backtracking — explore all possibilities, undo choices')}
        {ci('bt2','Subsets & Permutations',null,true)}
        {ci('bt3','N-Queens, Sudoku solver')}
        {ci('bt4','Greedy — activity selection, fractional knapsack')}
        {ci('bt5','Trie — prefix tree for strings',null,true)}
        {ci('bt6','Segment Tree / Fenwick Tree — range queries')}
        {ci('bt7','Problem patterns: two-pointer, sliding window, fast/slow, divide & conquer')}
      </SectionCard>
    </div>
  )
}