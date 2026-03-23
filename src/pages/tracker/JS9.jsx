import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'js9'
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
export default function JS9() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'JS Deep Internals'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="JS Deep Internals" subtitle="Character encoding, memory model, escape sequences, static vs dynamic allocation" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔡" title="Character Encoding & Strings" defaultOpen>
        <div className="info-box info-blue">JS strings are UTF-16 encoded internally. This affects string length for emoji and surrogate pairs.</div>
        {ci('ce1','ASCII vs UTF-8 vs UTF-16 — what JS uses internally','ASCII: 128 chars · UTF-8: variable-width · UTF-16: JS internal · "😀".length === 2')}
        {ci('ce2','Escape sequences — \\n \\t \\\\ \\uXXXX \\xXX','\\u{1F600} ES6 unicode escape · Used in regex and string literals')}
        {ci('ce3','Surrogate pairs — emoji and rare chars need 2 code units','Use Array.from() or [...str] to correctly iterate unicode',true)}
        {ci('ce4','TextEncoder / TextDecoder — encoding strings to bytes')}
      </SectionCard>
      <SectionCard icon="🧠" title="Memory Model & Allocation">
        {ci('mm1','Stack vs Heap memory — primitives on stack, objects on heap','Stack: fixed size, fast, LIFO · Heap: dynamic, slower, GC managed',true)}
        {ci('mm2','Static vs dynamic memory allocation','Static: size known at compile time · Dynamic: runtime allocation (objects, closures)')}
        {ci('mm3','Memory lifecycle — allocate → use → release (GC)')}
        {ci('mm4','Virtual memory — OS abstracts physical memory for processes','Each process gets isolated virtual address space · Paging maps virtual to physical pages')}
        {ci('mm5','Memory pool pattern — pre-allocate fixed pool for performance','Avoids GC pressure in game loops · ArrayBuffer as typed memory pool')}
      </SectionCard>
      <SectionCard icon="🔢" title="Arrays Deep Dive — Sparse & Typed">
        {ci('sa1','Sparse arrays — arrays with holes ([1,,3]), empty slots vs undefined','new Array(5) creates sparse · map/forEach skip holes · Array.from fills them')}
        {ci('sa2','Typed arrays — Int8Array, Uint8Array, Float32Array, ArrayBuffer','Fixed type, fixed size, no boxing · Used for binary data, WebGL, file I/O')}
        {ci('sa3','ArrayBuffer vs SharedArrayBuffer — transferable vs shared between workers')}
        {ci('sa4','DataView — read/write different types from same ArrayBuffer')}
      </SectionCard>
    </div>
  )
}