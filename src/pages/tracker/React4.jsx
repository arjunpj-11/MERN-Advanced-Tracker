import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'react4'
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
export default function React4() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'React Testing, Styling & Auth'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Testing, Styling & Auth in React" subtitle="Complete React ecosystem — testing, styling solutions, authentication" tags={['react']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🧪" title="Testing in React" defaultOpen>
        {ci('t1','Jest — describe, it/test, expect, matchers')}
        {ci('t2','React Testing Library — render, screen, fireEvent, userEvent')}
        {ci('t3','Querying: getBy, findBy, queryBy — differences','getBy: throws · queryBy: returns null · findBy: async')}
        {ci('t4','Mocking — jest.fn(), jest.mock(), spyOn')}
        {ci('t5','Testing async code — waitFor, findByText')}
        {ci('t6','Snapshot testing — when useful, when to avoid')}
        {ci('t7','Testing custom hooks — renderHook')}
        {ci('t8','Code coverage — what it measures, 80% target')}
      </SectionCard>
      <SectionCard icon="🎨" title="Styling Solutions">
        {ci('st1','CSS Modules — scoped styles, no class name collisions')}
        {ci('st2','Styled-components — CSS-in-JS, dynamic styles with props')}
        {ci('st3','Tailwind CSS — utility-first, purge unused styles')}
        {ci('st4','CSS-in-JS tradeoffs — runtime cost vs DX benefits')}
        {ci('st5','CSS variables (custom properties) in React')}
        {ci('st6','Theme systems — dark mode implementation')}
      </SectionCard>
      <SectionCard icon="🔐" title="Authentication in React">
        {ci('a1','JWT storage — localStorage vs httpOnly cookie','httpOnly cookie: safer (no XSS access) · localStorage: easier but XSS risk')}
        {ci('a2','Protected routes — redirect if not authenticated')}
        {ci('a3','Auth context — global auth state with useContext')}
        {ci('a4','Axios interceptors — attach token to every request')}
        {ci('a5','Token refresh strategy — silent refresh with refresh tokens')}
        {ci('a6','Role-based access control (RBAC) in UI')}
        {ci('a7','Formik / React Hook Form — form management, validation')}
        {ci('a8','React Query / SWR — server state, caching, background refetch',null,true)}
        {ci('a9','Project structure — feature-based folder organization')}
        {ci('a10','Deployment — Vercel, Netlify, build optimization')}
      </SectionCard>
    </div>
  )
}