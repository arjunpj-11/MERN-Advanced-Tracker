import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'react5'
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
export default function React5() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'React 19 & Advanced'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="React Advanced & React 19" subtitle="Concurrent features, React 19 additions, advanced patterns" tags={['react']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🚀" title="React 19 New Features ⭐" defaultOpen>
        <div className="info-box info-yellow">React 19 shipped stable Dec 2024. Major additions: Actions, new hooks (useActionState, useOptimistic, use), ref as prop, improved error reporting.</div>
        {ci('r19a','Actions — async functions for form submissions, replaces event handlers','<form action={serverAction}> · Handles pending/error states automatically',true)}
        {ci('r19b','useActionState — manage action state (replaces useFormState)','const [state, formAction, isPending] = useActionState(fn, initialState)',true)}
        {ci('r19c','useOptimistic — optimistic UI updates during async operations','const [optimistic, addOptimistic] = useOptimistic(state, updateFn)',true)}
        {ci('r19d','use() hook — read resources (Promise, Context) during render','const data = use(promise) · Can be called conditionally · Suspense-aware',true)}
        {ci('r19e','ref as prop — no more forwardRef needed in React 19','function Input({ ref, ...props }) { } · forwardRef still works but deprecated',true)}
        {ci('r19f','Document metadata in JSX — <title>, <meta> directly in components','React 19 hoists to <head> automatically · No need for react-helmet')}
        {ci('r19g','Improved error reporting — distinguishing hydration vs render errors')}
      </SectionCard>
      <SectionCard icon="⚡" title="Concurrent React (R18)">
        {ci('cr1','Concurrent Mode — React can interrupt and resume renders')}
        {ci('cr2','useTransition — mark state updates as non-urgent','const [isPending, startTransition] = useTransition()',true)}
        {ci('cr3','useDeferredValue — defer re-rendering heavy component','const deferred = useDeferredValue(value) · Like debounce but schedule-aware',true)}
        {ci('cr4','Automatic batching in React 18 — batch all state updates')}
        {ci('cr5','Suspense for data fetching — show fallback while loading')}
        {ci('cr6','Streaming SSR with Suspense — send HTML in chunks')}
      </SectionCard>
    </div>
  )
}