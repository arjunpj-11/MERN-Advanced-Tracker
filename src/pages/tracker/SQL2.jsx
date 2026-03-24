import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'

const PAGE_ID = 'sql2'
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

export default function SQL2() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'SQL Joins & Relationships'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />

  return (
    <div className="page-content">
      <PageHeader
        title="Joins & Relationships"
        subtitle="All join types, foreign keys, normalization — most asked SQL interview topics"
        tags={['sql']}
      />
      <ProgressBar done={stats.done} total={stats.total} />

      <SectionCard icon="🔗" title="All JOIN Types ⭐ Most Asked" defaultOpen>
        <div className="info-box info-yellow">
          INNER JOIN: only matching rows · LEFT JOIN: all left + matching right · RIGHT JOIN: all right + matching left · FULL JOIN: all rows from both
        </div>
        {ci('j1', 'INNER JOIN — only rows with matches in both tables', 'Most common · Returns intersection', true)}
        {ci('j2', 'LEFT JOIN (LEFT OUTER JOIN) — all rows from left, NULL for non-matches', 'Most used after INNER JOIN · Use to find unmatched rows', true)}
        {ci('j3', 'RIGHT JOIN — all rows from right table', 'Less common · Can be rewritten as LEFT JOIN')}
        {ci('j4', 'FULL OUTER JOIN — all rows from both tables', 'NULLs on both sides for non-matches · Expensive on large tables')}
        {ci('j5', 'CROSS JOIN — cartesian product of both tables', 'Every row combined with every other row · N * M rows · Use carefully')}
        {ci('j6', 'SELF JOIN — join a table with itself', 'Employee-manager hierarchy · Find pairs in same table · Use table aliases', true)}
        {ci('j7', 'Multiple JOINs — joining 3+ tables', 'Chain multiple JOIN clauses · Performance degrades · Use indexes on join columns')}
      </SectionCard>

      <SectionCard icon="🏗" title="Keys & Relationships ⭐">
        {ci('j8', 'Primary Key — unique identifier for each row', 'Cannot be NULL · Can be composite · PostgreSQL: SERIAL or UUID', true)}
        {ci('j9', 'Foreign Key — references primary key of another table', 'Enforces referential integrity · ON DELETE CASCADE / SET NULL / RESTRICT', true)}
        {ci('j10', 'Normalization — 1NF, 2NF, 3NF, BCNF', '1NF: atomic values · 2NF: no partial dependencies · 3NF: no transitive dependencies · Denormalization for performance', true)}
      </SectionCard>
    </div>
  )
}