import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'react2'
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
export default function React2() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'React Hooks & Performance'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Hooks & Performance" subtitle="All hooks deep-dived + optimization techniques" tags={['react']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🪝" title="All Hooks" defaultOpen>
        {ci('h1','useState — functional updates, lazy init',null,true)}
        {ci('h2','useEffect — deps array, cleanup, stale closure',null,true)}
        {ci('h3','useEffect vs useLayoutEffect — timing')}
        {ci('h4','useRef — DOM access & mutable values')}
        {ci('h5','useMemo — memoize expensive computations',null,true)}
        {ci('h6','useCallback — stable fn reference for child props',null,true)}
        {ci('h7','useContext — context API setup')}
        {ci('h8','useReducer — complex state logic')}
        {ci('h9','Custom hooks — useDebounce, useFetch, usePrevious',null,true)}
        {ci('h10','Rules of hooks — top-level, not in conditions')}
        {ci('h11','useId — generate stable unique IDs for accessibility','React 18+ · Avoids hydration mismatch in SSR')}
      </SectionCard>
      <SectionCard icon="⚡" title="Performance Optimization">
        {ci('p1','React.memo — prevent unnecessary re-renders',null,true)}
        {ci('p2','Code splitting — React.lazy + Suspense',null,true)}
        {ci('p3','Pagination & infinite scroll patterns')}
        {ci('p4','Debouncing search inputs')}
        {ci('p5','React 18 — automatic batching, useTransition')}
        {ci('p6','Prop drilling problem → Context or Redux')}
        {ci('p7','Testing — Jest & React Testing Library')}
        {ci('p8','Tree shaking — dead code elimination at build time','Webpack/Vite remove unused exports · Requires ES modules')}
      </SectionCard>
    </div>
  )
}