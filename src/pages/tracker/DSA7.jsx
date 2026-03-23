import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'dsa7'
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
export default function DSA7() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'All Graph Types & Algorithms'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="All Graph Types & Algorithms" subtitle="Every graph classification + all must-know algorithms" tags={['dsa']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🗂" title="Graph Classifications" defaultOpen>
        {ci('gc1','Undirected Graph — edges are bidirectional','Social networks, road maps')}
        {ci('gc2','Directed Graph (Digraph) — edges have direction A→B','Web links, task dependencies, Twitter follows')}
        {ci('gc3','Weighted Graph ⭐ — edges have weights (cost/distance)','Google Maps, network routing, flight prices')}
        {ci('gc4','DAG (Directed Acyclic Graph) ⭐⭐ — no cycles, directed','Build systems, course prerequisites, Git commits, npm dependencies')}
        {ci('gc5','Bipartite Graph ⭐ — nodes split into 2 sets, edges only between sets','Matching problems · Check with BFS 2-coloring')}
        {ci('gc6','Complete Graph — every node connected to every other node','N nodes → N*(N-1)/2 edges (undirected)')}
        {ci('gc7','Sparse vs Dense Graph — affects algorithm choice','Sparse: adjacency list · Dense: adjacency matrix')}
        {ci('gc8','Connected vs Disconnected — BFS/DFS from one node')}
      </SectionCard>
      <SectionCard icon="🗺" title="Graph Representations">
        {ci('gr1','Adjacency List ⭐ — O(V+E) space, preferred for most problems')}
        {ci('gr2','Adjacency Matrix — O(V²) space, O(1) edge lookup')}
        {ci('gr3','Edge List — list of (u, v, weight) pairs')}
      </SectionCard>
      <SectionCard icon="🔄" title="Graph Traversal Algorithms ⭐">
        {ci('tr1','BFS ⭐ — shortest path in unweighted graph, level order','Uses Queue · Visits neighbors before going deeper')}
        {ci('tr2','DFS ⭐ — connected components, cycle detection, topological sort','Uses Stack/Recursion · Goes deep before backtracking')}
        {ci('tr3','BFS vs DFS — when to use which','BFS: shortest path · DFS: cycle detection, topological sort')}
        {ci('tr4','Multi-source BFS — start from multiple nodes')}
        {ci('tr5','Number of Islands — BFS/DFS on 2D grid')}
      </SectionCard>
      <SectionCard icon="🔵" title="Cycle Detection ⭐">
        {ci('cy1','Undirected graph — DFS with parent tracking')}
        {ci('cy2','Directed graph — DFS with recursion stack (white-gray-black)')}
        {ci('cy3','Union-Find (Disjoint Set) ⭐ — cycle detection in undirected','find() + union() with path compression + union by rank')}
      </SectionCard>
      <SectionCard icon="📋" title="Topological Sort ⭐">
        <div className="info-box info-blue">Only works on DAG. Linear ordering where for every edge u→v, u comes before v.</div>
        {ci('tp1','Kahn\'s Algorithm — BFS + indegree array',null,true)}
        {ci('tp2','DFS-based topological sort — post-order + reverse')}
        {ci('tp3','Detect cycle with Kahn\'s — if result.length < n, cycle exists')}
        {ci('tp4','Applications: course schedule, build order, npm install')}
      </SectionCard>
      <SectionCard icon="🗺" title="Shortest Path Algorithms ⭐">
        {ci('sp1','Dijkstra\'s Algorithm ⭐ — greedy, min heap, non-negative weights','dist[src]=0, relax neighbors, use priority queue')}
        {ci('sp2','Bellman-Ford — handles negative weights, detects negative cycles')}
        {ci('sp3','Floyd-Warshall — all pairs shortest path, O(V³)')}
        {ci('sp4','Why Dijkstra fails with negative weights')}
      </SectionCard>
      <SectionCard icon="🌿" title="Minimum Spanning Tree (MST) ⭐">
        {ci('mst1','Kruskal\'s Algorithm ⭐ — sort edges + Union-Find','O(E log E) · Greedy: always pick minimum edge that doesn\'t form cycle')}
        {ci('mst2','Prim\'s Algorithm ⭐ — grow MST greedily from source','O(E log V) with min heap · Similar to Dijkstra')}
        {ci('mst3','Kruskal vs Prim — when to use each','Kruskal: sparse · Prim: dense')}
        {ci('mst4','Union-Find (DSU) ⭐ — find + union operations','Path compression + union by rank → near O(1)')}
      </SectionCard>
      <SectionCard icon="💡" title="Interview Focus">
        {ci('if1','Know when to use BFS vs DFS for a given problem')}
        {ci('if2','Strongly Connected Components (SCC) — Kosaraju\'s algorithm')}
        {ci('if3','Bipartite check — BFS 2-coloring')}
        {ci('if4','Multigraph — multiple edges between same pair of nodes')}
      </SectionCard>
    </div>
  )
}