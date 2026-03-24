import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'

const PAGE_ID = 'sql6'
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

export default function SQL6() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'PostgreSQL Specific Features'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />

  return (
    <div className="page-content">
      <PageHeader
        title="PostgreSQL Specific Features"
        subtitle="JSONB, arrays, full-text search, stored procedures, pg-specific power features"
        tags={['sql']}
      />
      <ProgressBar done={stats.done} total={stats.total} />

      <SectionCard icon="🐘" title="PostgreSQL Data Types" defaultOpen>
        <div className="info-box info-blue">
          PostgreSQL has the richest type system of any RDBMS — arrays, JSONB, ranges, custom types, enums, and more.
        </div>
        {ci('p1', 'JSONB — binary JSON storage with indexing ⭐', 'JSONB > JSON · GIN index on JSONB · Operators: ->, ->>, #>, @>, ? · Query nested JSON', true)}
        {ci('p2', 'Arrays — native array type', 'col INTEGER[] · ANY, ALL operators · array_agg() · unnest() to expand · GIN index for arrays', true)}
        {ci('p3', 'UUID — universally unique identifier', 'gen_random_uuid() · Better than SERIAL for distributed systems · No sequence bottleneck')}
        {ci('p4', 'Enum types — CREATE TYPE mood AS ENUM', 'CREATE TYPE status AS ENUM ("active","inactive") · Type-safe · Can add values but not remove')}
        {ci('p5', 'Range types — daterange, tsrange, numrange', 'daterange overlaps: && operator · Contains: @> · Great for scheduling, validity periods')}
      </SectionCard>

      <SectionCard icon="🔍" title="Full-Text Search ⭐">
        {ci('p6', 'tsvector & tsquery — full-text search types', 'to_tsvector("english", col) · to_tsquery("search & term") · @@ match operator', true)}
        {ci('p7', 'GIN index for full-text search', 'CREATE INDEX ON articles USING GIN(to_tsvector("english", body)) · Very fast text search')}
        {ci('p8', 'ts_rank — relevance ranking', 'ts_rank(tsvector, tsquery) · ORDER BY rank DESC · Like basic search engine')}
      </SectionCard>

      <SectionCard icon="⚙" title="Functions, Procedures & Triggers ⭐">
        {ci('p9', 'Stored Functions — reusable SQL/PL-pgSQL logic', 'CREATE FUNCTION fn(args) RETURNS type AS $$ ... $$ LANGUAGE plpgsql · Runs inside DB', true)}
        {ci('p10', 'Stored Procedures — like functions but with transactions', 'CREATE PROCEDURE · Can COMMIT/ROLLBACK inside · CALL proc() · Added in PostgreSQL 11')}
        {ci('p11', 'Triggers — auto-run on INSERT/UPDATE/DELETE', 'CREATE TRIGGER · BEFORE/AFTER/INSTEAD OF · Row-level vs statement-level · Use for audit logs', true)}
        {ci('p12', 'Views — saved SELECT queries', 'CREATE VIEW · Materialized Views: cached result · REFRESH MATERIALIZED VIEW · Use for complex reporting queries', true)}
      </SectionCard>

      <SectionCard icon="🚀" title="PostgreSQL Performance & Production">
        {ci('p13', 'Connection pooling — PgBouncer, pg pool', 'PostgreSQL: new connection = new process (expensive) · PgBouncer pools connections · pgpool-II adds load balancing', true)}
        {ci('p14', 'VACUUM & AUTOVACUUM — dead row cleanup', 'MVCC creates dead rows on UPDATE/DELETE · VACUUM reclaims space · ANALYZE updates statistics · VACUUM FULL rewrites table')}
      </SectionCard>
    </div>
  )
}