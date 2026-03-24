import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'

const PAGE_ID = 'sql5'
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

export default function SQL5() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'SQL Transactions & ACID'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />

  return (
    <div className="page-content">
      <PageHeader
        title="Transactions & ACID"
        subtitle="Concurrency, locking, isolation levels — critical for backend roles"
        tags={['sql']}
      />
      <ProgressBar done={stats.done} total={stats.total} />

      <SectionCard icon="🔒" title="ACID Properties ⭐" defaultOpen>
        <div className="info-box info-yellow">
          ACID guarantees: Atomicity (all or nothing) · Consistency (valid state) · Isolation (concurrent transactions don't interfere) · Durability (committed data persists)
        </div>
        {ci('t1', 'Atomicity — all operations succeed or all fail', 'BEGIN; UPDATE accounts SET bal = bal - 100 WHERE id=1; UPDATE accounts SET bal = bal + 100 WHERE id=2; COMMIT;', true)}
        {ci('t2', 'Consistency — database always in valid state', 'Constraints enforced · Foreign keys maintained · Custom rules via CHECK constraints')}
        {ci('t3', 'Isolation — concurrent transactions behave as if sequential', 'Isolation levels control trade-off between consistency and performance', true)}
        {ci('t4', 'Durability — committed data survives crashes', 'WAL (Write-Ahead Log) in PostgreSQL · Fsync · Crash recovery')}
      </SectionCard>

      <SectionCard icon="🔀" title="Isolation Levels ⭐⭐">
        <div className="info-box info-blue">
          Problems: Dirty Read · Non-Repeatable Read · Phantom Read · Isolation levels control which problems can occur.
        </div>
        {ci('t5', 'READ UNCOMMITTED — can read uncommitted data (dirty reads)', 'Fastest but least safe · Not available in PostgreSQL (maps to READ COMMITTED)')}
        {ci('t6', 'READ COMMITTED — default in PostgreSQL', 'Prevents dirty reads · Can have non-repeatable reads · Most common level', true)}
        {ci('t7', 'REPEATABLE READ — same query returns same data', 'Prevents dirty + non-repeatable reads · Can have phantom reads · Good for reports')}
        {ci('t8', 'SERIALIZABLE — highest isolation', 'Prevents all anomalies · Slowest · Like running transactions one at a time', true)}
        {ci('t9', 'Deadlocks — two transactions blocking each other', 'PostgreSQL detects and kills one transaction · Prevention: always lock in same order · NOWAIT option')}
      </SectionCard>
    </div>
  )
}