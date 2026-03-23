import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'next1'
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
export default function Next1() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Next.js Core'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Next.js Core" subtitle="File routing, server/client components, middleware" tags={['next']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="▲" title="Core Concepts" defaultOpen>
        {ci('n1','What is Next.js — React framework, SSR, SSG, API routes')}
        {ci('n2','File-based routing — pages/ vs app/ directory',null,true)}
        {ci('n3','App Router (Next.js 13+) — layout.tsx, loading.tsx')}
        {ci('n4','Dynamic routes [id], catch-all [...slug]')}
        {ci('n5','Server components vs Client components ("use client")',null,true)}
        {ci('n6','API Routes — GET/POST handlers inside Next.js',null,true)}
        {ci('n7','Middleware — runs before request, auth checks, redirects')}
        {ci('n8','Next.js vs React — routing, SSR, SEO comparison')}
        {ci('n9','Image optimization — next/image',null,true)}
        {ci('n10','Font optimization, static assets (public/)')}
        {ci('n11','Environment variables — .env.local, public vs private')}
        {ci('n12','Error handling — error.js, not-found.js')}
        {ci('n13','Authentication — NextAuth.js',null,true)}
        {ci('n14','SEO — Metadata API, dynamic meta tags',null,true)}
        {ci('n15','Deployment — Vercel, build process, edge functions')}
        {ci('n16','Automatic code splitting — each page only loads its JS','Next.js splits at page boundaries · dynamic import() for manual splitting')}
        {ci('n17','useRouter — push vs replace navigation','push: adds to history · replace: replaces current entry · App router: next/navigation')}
      </SectionCard>
    </div>
  )
}