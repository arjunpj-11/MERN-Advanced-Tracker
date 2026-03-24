import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'

const PAGE_ID = 'sql3'
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

export default function SQL3() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Advanced SQL Queries'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />

  return (
    <div className="page-content">
      <PageHeader
        title="Advanced SQL Queries"
        subtitle="Subqueries, CTEs, window functions, set operations"
        tags={['sql']}
      />
      <ProgressBar done={stats.done} total={stats.total} />

      <SectionCard icon="📝" title="Subqueries & CTEs ⭐" defaultOpen>
        <div className="info-box info-blue">
          Subquery runs first, then outer query uses result. CTEs (WITH clause) make complex queries readable and reusable.
        </div>
        {ci('a1', 'Subqueries — queries inside queries', 'In WHERE: WHERE id IN (SELECT ...) · In FROM: SELECT * FROM (SELECT ...) AS sub · In SELECT: correlated subqueries', true)}
        {ci('a2', 'Correlated subqueries — reference outer query', 'Runs once per outer row · Slow but powerful · Alternative: JOIN is usually faster', true)}
        {ci('a3', 'CTE (Common Table Expression) — WITH clause', 'WITH cte AS (SELECT ...) SELECT * FROM cte · Readable, reusable · Non-recursive CTEs', true)}
        {ci('a4', 'Recursive CTE — hierarchical data', 'WITH RECURSIVE · Employee hierarchy · File tree traversal · Base case + recursive case', true)}
        {ci('a5', 'EXISTS vs IN — correlated existence check', 'EXISTS stops at first match (faster) · IN loads all values · Use EXISTS for large subqueries')}
      </SectionCard>

      <SectionCard icon="🪟" title="Window Functions ⭐⭐ Senior-Level">
        <div className="info-box info-yellow">
          Window functions operate on a set of rows related to the current row WITHOUT collapsing them like GROUP BY. Most common senior SQL interview topic.
        </div>
        {ci('a6', 'ROW_NUMBER() — assign unique row number in partition', 'ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)', true)}
        {ci('a7', 'RANK() vs DENSE_RANK() — ranking with ties', 'RANK: gaps on ties (1,1,3) · DENSE_RANK: no gaps (1,1,2)', true)}
        {ci('a8', 'LEAD() & LAG() — access next/previous row value', 'LAG(salary, 1) OVER (...) · Compare current row with previous/next · Month-over-month growth', true)}
        {ci('a9', 'SUM/AVG/COUNT OVER — running totals & moving averages', 'SUM(amount) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)', true)}
        {ci('a10', 'PARTITION BY — divide window into groups', 'PARTITION BY department · Resets calculation per partition · Like GROUP BY but keeps all rows')}
        {ci('a11', 'NTILE(n) — divide rows into n buckets', 'NTILE(4) for quartiles · NTILE(100) for percentiles')}
      </SectionCard>

      <SectionCard icon="🔀" title="Set Operations & Other">
        {ci('a12', 'UNION vs UNION ALL — combine result sets', 'UNION: removes duplicates (slower) · UNION ALL: keeps all rows (faster) · Same column count & types required', true)}
      </SectionCard>
    </div>
  )
}