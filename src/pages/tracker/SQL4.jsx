import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'

const PAGE_ID = 'sql4'
const PAGE_ITEMS = ALL_PAGE_ITEMS.find(p => p.pageId === PAGE_ID)

function CI({ id, label, sub, star, pageId, toggle, isChecked, openAI, context }) {
  const checked = isChecked(pageId, id)
  return (
    <div className={`check-item ${checked ? 'done' : ''}`} onClick={() => toggle(pageId, id)}>
      <div className="check-box" />
      <div style={{ flex: 1 }}>
        <div className="check-label">{label} {star && <span className="diff-star">⭐</span>}</div>
        {sub && <div className="check-sub">{sub}</div>}
      </div>
      <button className="ai-btn" onClick={e => { e.stopPropagation(); openAI(label, context) }}>✦</button>
    </div>
  )
}

export default function SQL4() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'SQL Indexes & Performance'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />

  return (
    <div className="page-content">
      <PageHeader
        title="Indexes & Performance"
        subtitle="Query optimization, execution plans, indexes — critical for production"
        tags={['sql']}
      />
      <ProgressBar done={stats.done} total={stats.total} />

      <SectionCard icon="⚡" title="Indexes ⭐ Most Important" defaultOpen>
        <div className="info-box info-blue">
          Indexes speed up reads but slow down writes. Always index: foreign keys, WHERE columns, ORDER BY columns, JOIN columns.
        </div>
        {ci('i1', 'What is an index — B-tree structure', 'B-tree: balanced tree · O(log n) lookup · PostgreSQL default index type · Like a book index', true)}
        {ci('i2', 'CREATE INDEX — single column index', 'CREATE INDEX idx_name ON table(column) · CONCURRENTLY for no table lock', true)}
        {ci('i3', 'Composite index — multi-column index', 'CREATE INDEX ON table(col1, col2) · Column order matters · Leftmost prefix rule', true)}
        {ci('i4', 'Unique index — enforce uniqueness', 'CREATE UNIQUE INDEX · PRIMARY KEY creates unique index automatically · NULL is not equal to NULL')}
        {ci('i5', 'Partial index — index subset of rows', 'CREATE INDEX ON orders(status) WHERE status = "pending" · Smaller, faster for filtered queries', true)}
        {ci('i6', 'Index types in PostgreSQL — B-tree, Hash, GIN, GiST, BRIN', 'B-tree: default · Hash: equality only · GIN: full-text, arrays, JSONB · GiST: geometric · BRIN: time-series')}
      </SectionCard>

      <SectionCard icon="🔍" title="Query Performance ⭐">
        {ci('i7', 'EXPLAIN & EXPLAIN ANALYZE — query execution plan', 'EXPLAIN ANALYZE SELECT ... · Seq Scan vs Index Scan · Cost, rows, actual time', true)}
        {ci('i8', 'Sequential scan vs Index scan — when each is used', 'Small tables: seq scan faster · Large tables with filters: index scan · Low cardinality → seq scan')}
        {ci('i9', 'Query optimization techniques', 'Avoid SELECT * · Use LIMIT · Filter early · Avoid functions on indexed columns in WHERE', true)}
        {ci('i10', 'N+1 query problem in SQL — and solutions', 'Use JOIN instead of loop queries · Use IN clause · Batch queries · Same as ORM N+1 problem', true)}
      </SectionCard>
    </div>
  )
}