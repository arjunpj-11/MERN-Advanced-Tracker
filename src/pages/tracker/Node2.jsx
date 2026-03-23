import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'node2'
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
export default function Node2() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Node.js Streams & Child Processes'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Streams, Buffers & Child Processes" subtitle="Advanced Node — makes you stand out" tags={['node']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🌊" title="Streams & Buffers ⭐" defaultOpen>
        {ci('sb1','What is Buffer — binary data handling')}
        {ci('sb2','Stream types: Readable, Writable, Duplex, Transform')}
        {ci('sb3','stream.pipe() — connecting streams')}
        {ci('sb4','Handling large files efficiently with streams')}
      </SectionCard>
      <SectionCard icon="🔀" title="Child Processes ⭐">
        <div className="info-box info-blue">spawn: streaming large data · exec: small commands buffered · execFile: no shell, secure · fork: new Node process + IPC</div>
        {ci('cp1','child_process module — why it exists')}
        {ci('cp2','spawn() — streaming large output')}
        {ci('cp3','exec() — small commands, buffer limit ~200KB')}
        {ci('cp4','execFile() — no shell, more secure')}
        {ci('cp5','fork() — new Node process, IPC communication',null,true)}
        {ci('cp6','IPC — child.send() / process.on("message")')}
        {ci('cp7','Cluster module — multi-core utilization',null,true)}
        {ci('cp8','Worker Threads — true multithreading, shared memory')}
      </SectionCard>
    </div>
  )
}