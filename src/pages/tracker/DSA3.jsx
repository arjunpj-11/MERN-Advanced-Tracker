import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa3'
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
export default function DSA3() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Trees, Heaps & Graphs'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Trees, Heaps & Graphs" subtitle="Binary trees, BST, traversals, BFS/DFS, graph algorithms" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🌳" title="Binary Trees & BST" defaultOpen>
        {ci('tr1','Binary Tree vs BST — BST property: left < root < right')}
        {ci('tr2','Inorder / Preorder / Postorder traversal',null,true)}
        {ci('tr3','Level-order (BFS) traversal',null,true)}
        {ci('tr4','Height / max depth of tree')}
        {ci('tr5','Diameter of binary tree')}
        {ci('tr6','Lowest Common Ancestor (LCA)',null,true)}
        {ci('tr7','Validate BST')}
        {ci('tr8','Path sum problems')}
      </SectionCard>
      <SectionCard icon="⛰" title="Heap (Priority Queue)">
        {ci('hp1','Min heap / Max heap — property & operations')}
        {ci('hp2','Top K elements — min heap approach')}
        {ci('hp3','Heap sort — O(n log n)')}
        {ci('hp4','Median of data stream')}
      </SectionCard>
      <SectionCard icon="🕸" title="Graphs ⭐">
        {ci('gr1','Representations: adjacency list vs matrix',null,true)}
        {ci('gr2','BFS — level traversal, shortest path unweighted',null,true)}
        {ci('gr3','DFS — recursive & iterative',null,true)}
        {ci('gr4','Number of islands — grid DFS/BFS')}
        {ci('gr5','Cycle detection — directed & undirected')}
        {ci('gr6','Topological sort — Kahn\'s BFS algorithm',null,true)}
        {ci('gr7','Dijkstra\'s shortest path',null,true)}
        {ci('gr8','Bellman-Ford, Floyd-Warshall (basic idea)')}
        {ci('gr9','Disjoint Set / Union-Find',null,true)}
      </SectionCard>
    </div>
  )
}