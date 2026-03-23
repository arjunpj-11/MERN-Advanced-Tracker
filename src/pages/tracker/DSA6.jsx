import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa6'
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
export default function DSA6() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'All Tree Types'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="All Tree Types" subtitle="Every tree structure — theory, properties & interview focus" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🌳" title="Basic Tree Types" defaultOpen>
        <div className="info-box info-blue">A tree is a hierarchical data structure. No cycles. N nodes = N-1 edges.</div>
        {ci('bt1','General Tree — any number of children per node','No restriction on children · File systems, org charts')}
        {ci('bt2','Binary Tree ⭐ — max 2 children (left, right)','Foundation for BST, Heap, AVL, Red-Black trees')}
        {ci('bt3','N-ary Tree — each node can have N children','Used in: tries, DOM tree, file directories')}
      </SectionCard>
      <SectionCard icon="🔵" title="Types of Binary Trees">
        {ci('bbt1','Full Binary Tree — every node has 0 or 2 children')}
        {ci('bbt2','Complete Binary Tree ⭐ — used in Heaps','All levels filled except last · Last level filled left to right')}
        {ci('bbt3','Perfect Binary Tree — all levels completely filled','Nodes = 2^h - 1 where h = height')}
        {ci('bbt4','Balanced Binary Tree ⭐ — |height(L) - height(R)| ≤ 1','Guarantees O(log n) operations · AVL & Red-Black are balanced')}
        {ci('bbt5','Degenerate (Skewed) Tree — worst case, O(n) operations','Behaves like linked list')}
      </SectionCard>
      <SectionCard icon="🔍" title="Binary Search Tree (BST) ⭐">
        <div className="info-box info-yellow">BST Property: Left subtree &lt; Root &lt; Right subtree. Inorder traversal of BST = sorted array.</div>
        {ci('bst1','BST property — left < root < right')}
        {ci('bst2','Insert & Search — O(log n) avg, O(n) worst (skewed)')}
        {ci('bst3','Delete node — 3 cases: leaf, one child, two children')}
        {ci('bst4','Validate BST — min/max bounds approach')}
        {ci('bst5','Kth smallest element — inorder traversal')}
        {ci('bst6','Inorder of BST = sorted array (key insight)')}
      </SectionCard>
      <SectionCard icon="⚖" title="Self-Balancing Trees ⭐ Advanced">
        <div className="info-box info-blue">Self-balancing trees auto-rebalance on insert/delete to keep height O(log n).</div>
        {ci('avl1','AVL Tree ⭐ — balance factor = height(L) - height(R)','BF must be -1, 0, or +1 at every node')}
        {ci('avl2','AVL Rotations — Left, Right, Left-Right, Right-Left')}
        {ci('avl3','Red-Black Tree ⭐ — 5 properties (color rules)','Root is black · No two consecutive reds · Equal black height on all paths')}
        {ci('avl4','AVL vs Red-Black — AVL stricter (faster lookup), RB faster inserts')}
        {ci('avl5','Where used: C++ std::map, Java TreeMap, Linux CFS scheduler')}
      </SectionCard>
      <SectionCard icon="⛰" title="Heap (Complete Binary Tree) ⭐">
        <div className="info-box info-yellow">Heap stored as array. Parent: (i-1)/2 · Left child: 2i+1 · Right child: 2i+2</div>
        {ci('hp1','Min Heap — parent ≤ children · root = minimum')}
        {ci('hp2','Max Heap — parent ≥ children · root = maximum')}
        {ci('hp3','Heapify up (insert) & Heapify down (extract) — O(log n)')}
        {ci('hp4','Build heap from array — O(n) (not O(n log n)!)')}
        {ci('hp5','Priority Queue using heap — insert O(log n), peek O(1)')}
        {ci('hp6','Top K elements pattern — min heap of size K')}
        {ci('hp7','Heap sort — O(n log n) time, O(1) space')}
        {ci('hp8','Median of data stream — two heaps (min + max)')}
      </SectionCard>
      <SectionCard icon="📝" title="Trie (Prefix Tree) ⭐">
        {ci('tr1','Trie structure — nodes are characters, isEnd marks word end')}
        {ci('tr2','Insert, Search, StartsWith — all O(L) where L = word length')}
        {ci('tr3','Use cases: autocomplete, spell check, IP routing')}
        {ci('tr4','Trie vs HashMap — trie better for prefix queries')}
      </SectionCard>
      <SectionCard icon="📊" title="Segment Tree & Fenwick Tree (Advanced)">
        {ci('seg1','Segment Tree — range queries (sum/min/max) in O(log n)','Build: O(n) · Query: O(log n) · Update: O(log n)')}
        {ci('seg2','Fenwick Tree (BIT) — prefix sum queries in O(log n)','Simpler than Segment Tree · Only for prefix sums')}
        {ci('seg3','Expression Tree — used in compilers (operators as nodes)')}
      </SectionCard>
    </div>
  )
}