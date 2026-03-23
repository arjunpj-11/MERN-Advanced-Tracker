import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'next3'
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
export default function Next3() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Next.js Advanced & Real-World'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Next.js Advanced & Real-World" subtitle="Middleware deep dive, auth patterns, performance, state management" tags={['next']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔧" title="Middleware & Advanced Routing" defaultOpen>
        <div className="info-box info-blue">Middleware runs before every request — ideal for auth checks, redirects, A/B testing. Lives in middleware.ts at root level.</div>
        {ci('m1','middleware.ts — NextRequest, NextResponse.redirect/rewrite')}
        {ci('m2','Matcher config — apply middleware to specific routes only')}
        {ci('m3','Parallel routes — @slot convention, independent segments')}
        {ci('m4','Intercepting routes — (.) (..) (...) conventions')}
        {ci('m5','Route groups — (group) for layout sharing without URL segment')}
        {ci('m6','Edge runtime vs Node.js runtime — when to use each')}
        {ci('m7','Streaming with Suspense — loading.tsx, skeleton UI')}
      </SectionCard>
      <SectionCard icon="⚡" title="Performance, SEO & Real-World">
        {ci('p1','next/image — auto WebP, lazy load, blur placeholder, sizes prop')}
        {ci('p2','next/font — zero layout shift, self-hosted Google fonts')}
        {ci('p3','generateMetadata() — dynamic SEO, og:image, twitter:card',null,true)}
        {ci('p4','next/link prefetching — preloads on hover')}
        {ci('p5','Bundle analyzer — @next/bundle-analyzer')}
        {ci('p6','Caching strategies — full-route cache, data cache, router cache')}
        {ci('p7','revalidatePath / revalidateTag — on-demand ISR')}
        {ci('p8','NextAuth.js — providers, session, callbacks, adapter',null,true)}
        {ci('p9','State management in Next.js — Zustand, Jotai, or Redux')}
        {ci('p10','Pagination, infinite scroll, search in App Router')}
        {ci('p11','Vercel deployment — preview deployments, env variables, edge config')}
        {ci('p12','Next.js vs Remix vs Nuxt — common interview comparison')}
      </SectionCard>
    </div>
  )
}