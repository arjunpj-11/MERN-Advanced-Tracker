import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'node1'
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
export default function Node1() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Node.js Core & Internals'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Node.js Core & Internals" subtitle="Architecture, event loop, modules" tags={['node']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🟢" title="Node.js Fundamentals" defaultOpen>
        {ci('nd1','What is Node.js — V8 engine, libuv, non-blocking I/O',null,true)}
        {ci('nd2','Event-driven architecture & single-threaded')}
        {ci('nd3','Event loop phases: timers→pending→poll→check→close',null,true)}
        {ci('nd4','process.nextTick() vs setImmediate() vs setTimeout','nextTick: microtask · setImmediate: check phase · Order: nextTick → Promise.then → setImmediate',true)}
        {ci('nd5','Thread pool (libuv) — 4 threads for I/O')}
        {ci('nd6','Global objects — __dirname, __filename, process, Buffer')}
        {ci('nd7','Core modules: fs, http, path, os, events')}
        {ci('nd8','EventEmitter pattern')}
        {ci('nd9','CommonJS (require) vs ES Modules (import) — module caching')}
        {ci('nd10','npm / package.json — dependencies vs devDependencies, semver')}
        {ci('nd11','Memory management & garbage collection')}
        {ci('nd12','Reactor pattern — Node.js architectural pattern','Event Demultiplexer (libuv) collects I/O events · Core of Node\'s non-blocking design')}
        {ci('nd13','REPL — Read-Eval-Print-Loop, Node.js interactive shell','node command starts REPL · _ holds last result · .help, .exit')}
        {ci('nd14','Error-first callback convention — (err, data) pattern','fs.readFile(path, (err, data) => { if(err) throw err; })')}
      </SectionCard>
    </div>
  )
}