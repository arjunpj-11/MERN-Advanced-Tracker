import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'react1'
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
export default function React1() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'React Core'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="React Core" subtitle="Components, JSX, lifecycle, routing, patterns" tags={['react']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="⚛" title="React Fundamentals" defaultOpen>
        {ci('r1','What is React — virtual DOM, component-based')}
        {ci('r2','JSX — transpiles to React.createElement',null,true)}
        {ci('r3','Functional vs Class components')}
        {ci('r4','Props — passing data down, prop types')}
        {ci('r5','State — useState, when state changes triggers re-render')}
        {ci('r6','state vs props — difference',null,true)}
        {ci('r7','Class lifecycle: componentDidMount, Update, Unmount')}
        {ci('r8','Conditional rendering — if, ternary, &&')}
        {ci('r9','Lists & keys — why key prop matters',null,true)}
        {ci('r10','Controlled vs Uncontrolled components',null,true)}
        {ci('r11','Event handling — synthetic events')}
        {ci('r12','Forms — form validation basics')}
        {ci('r13','Synthetic events — React\'s cross-browser event wrapper','SyntheticEvent wraps native events · React 17: event pooling removed',true)}
        {ci('r14','Event pooling — legacy React 16 behavior (removed in React 17)')}
        {ci('r15','Shadow DOM vs Virtual DOM','Shadow DOM: browser built-in encapsulation · Virtual DOM: React\'s in-memory representation',true)}
        {ci('r16','Portals — render children outside parent DOM hierarchy','ReactDOM.createPortal(child, container) · Events still bubble through React tree')}
      </SectionCard>
      <SectionCard icon="🔀" title="Routing & Patterns">
        {ci('rp1','React Router — BrowserRouter, Route, Link',null,true)}
        {ci('rp2','Dynamic routes — useParams()')}
        {ci('rp3','Nested & protected routes')}
        {ci('rp4','HOC — Higher Order Components')}
        {ci('rp5','Render props pattern')}
        {ci('rp6','Compound components pattern')}
        {ci('rp7','Error boundaries — componentDidCatch')}
        {ci('rp8','Virtual DOM & Reconciliation',null,true)}
        {ci('rp9','Fiber architecture — basic idea')}
        {ci('rp10','API integration — Fetch/Axios + loading/error states')}
        {ci('rp11','Formik / React Hook Form')}
        {ci('rp12','JWT handling in React — token storage, protected routes')}
        {ci('rp13','forwardRef — pass ref through component to DOM element','React.forwardRef((props, ref) => ...) · Combined with useImperativeHandle',true)}
        {ci('rp14','Incremental rendering / Time slicing — Fiber schedules work in chunks','React 18 concurrent mode · startTransition marks low-priority updates')}
        {ci('rp15','Hot Module Replacement (HMR) — update modules without full page reload','Vite/webpack dev feature · React Fast Refresh preserves component state')}
      </SectionCard>
    </div>
  )
}