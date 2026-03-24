import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'

const PAGE_ID = 'sql1'
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

export default function SQL1() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'SQL Fundamentals'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />

  return (
    <div className="page-content">
      <PageHeader
        title="SQL Fundamentals"
        subtitle="Core SQL — queries, filtering, grouping, subqueries"
        tags={['sql']}
      />
      <ProgressBar done={stats.done} total={stats.total} />

      <SectionCard icon="🐘" title="What is SQL & Relational Databases" defaultOpen>
        <div className="info-box info-blue">
          SQL = Structured Query Language. Relational databases store data in tables with rows and columns. PostgreSQL is the most advanced open-source RDBMS.
        </div>
        {ci('s1', 'What is SQL — DDL, DML, DCL, TCL categories', 'DDL: CREATE/ALTER/DROP · DML: SELECT/INSERT/UPDATE/DELETE · DCL: GRANT/REVOKE · TCL: COMMIT/ROLLBACK')}
        {ci('s2', 'SQL vs NoSQL — when to use which', 'SQL: structured, ACID, complex queries · NoSQL: flexible schema, horizontal scale, unstructured data', true)}
        {ci('s3', 'Tables, rows, columns — basic structure', 'Each table has a schema · Primary key identifies each row uniquely')}
        {ci('s4', 'Data types — INTEGER, VARCHAR, TEXT, BOOLEAN, DATE, TIMESTAMP, NUMERIC, JSONB', 'PostgreSQL: JSONB for JSON · SERIAL/BIGSERIAL for auto-increment · UUID type', true)}
        {ci('s5', 'NULL — what it means, IS NULL vs = NULL', 'NULL is unknown, not empty · Use IS NULL, not = NULL · NULL != NULL')}
      </SectionCard>

      <SectionCard icon="🔍" title="SELECT & Filtering ⭐">
        {ci('s6', 'SELECT statement — basic syntax, aliases', 'SELECT col AS alias FROM table · SELECT * (avoid in production)', true)}
        {ci('s7', 'WHERE clause — filtering rows', 'Comparison: =, !=, <, >, <=, >= · Logical: AND, OR, NOT · BETWEEN, IN, LIKE', true)}
        {ci('s8', 'LIKE & ILIKE — pattern matching', '% matches any sequence · _ matches single char · ILIKE: case-insensitive (PostgreSQL)')}
        {ci('s9', 'ORDER BY — sorting results', 'ASC (default) vs DESC · Multiple columns: ORDER BY col1 ASC, col2 DESC')}
        {ci('s10', 'LIMIT & OFFSET — pagination', 'LIMIT 10 OFFSET 20 · Offset-based pagination has issues at scale → use cursor-based', true)}
        {ci('s11', 'DISTINCT — remove duplicate rows', 'SELECT DISTINCT col · vs GROUP BY · Performance impact on large tables')}
      </SectionCard>

      <SectionCard icon="📊" title="Aggregations & Grouping ⭐">
        {ci('s12', 'GROUP BY — group rows for aggregation', 'Must include non-aggregated columns in GROUP BY · ORDER of execution: WHERE → GROUP BY → HAVING → SELECT → ORDER BY', true)}
        {ci('s13', 'Aggregate functions — COUNT, SUM, AVG, MIN, MAX', 'COUNT(*) vs COUNT(col) — COUNT(col) ignores NULLs · COUNT(DISTINCT col)')}
        {ci('s14', 'HAVING — filter after GROUP BY', 'WHERE filters rows · HAVING filters groups · HAVING can reference aggregate functions', true)}
        {ci('s15', 'CASE WHEN — conditional expressions in SQL', 'CASE WHEN score > 90 THEN "A" WHEN score > 80 THEN "B" ELSE "C" END', true)}
      </SectionCard>
    </div>
  )
}