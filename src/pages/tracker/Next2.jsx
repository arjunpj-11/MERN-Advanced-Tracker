import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'next2'
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
export default function Next2() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Next.js Rendering & Data'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Rendering Methods & Data Fetching" subtitle="Most asked Next.js interview topic" tags={['next']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="⚡" title="Rendering Methods ⭐ Top Interview" defaultOpen>
        <div className="info-box info-blue">CSR: client-side · SSR: every request · SSG: build time · ISR: background regen</div>
        {ci('r1','CSR — client-side rendering, useEffect for data')}
        {ci('r2','SSR — getServerSideProps (pages), fetch in server component (app)',null,true)}
        {ci('r3','SSG — getStaticProps, getStaticPaths',null,true)}
        {ci('r4','ISR — revalidate option',null,true)}
        {ci('r5','fetch() in server components with cache options')}
        {ci('r6','Streaming & Suspense in App Router')}
        {ci('r7','Parallel routes & intercepting routes (advanced)')}
        {ci('r8','Edge runtime — faster cold starts')}
        {ci('r9','ISR revalidation strategies — time-based vs on-demand','revalidate: 60 · revalidatePath() on-demand · revalidateTag for tagged cache')}
        {ci('r10','Cache-Control headers — public, private, max-age, s-maxage')}
        {ci('r11','fallback in getStaticPaths — false/true/"blocking"','false: 404 · true: show fallback instantly · blocking: SSR for unknown paths')}
        {ci('r12','Build-time environment variables — NEXT_PUBLIC_ prefix','NEXT_PUBLIC_API_URL: available in browser · Non-prefixed: server only')}
      </SectionCard>
    </div>
  )
}