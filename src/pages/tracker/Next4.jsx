import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'next4'
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
export default function Next4() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Next.js Pages Router & Config'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Pages Router & Next.js Config" subtitle="Legacy pages router, _app.js, _document.js, next.config.js" tags={['next']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="📄" title="Pages Router Specifics ⭐" defaultOpen>
        <div className="info-box info-blue">The pages/ router is still widely used in production codebases. These concepts are commonly asked in interviews.</div>
        {ci('pr1','_app.js — global layout, global CSS, state persistence','Wraps all pages · Add providers here (Redux, Auth, ThemeProvider)')}
        {ci('pr2','_document.js — customize HTML shell, add fonts to head','Server-only, not re-rendered on client · Customize html lang')}
        {ci('pr3','getStaticProps — fetch data at build time, return as props','context has params, locale, preview · return { props: {...}, revalidate: 60 }')}
        {ci('pr4','getStaticPaths — define dynamic routes for SSG','Return { paths: [{params:{id:"1"}}], fallback: false }')}
        {ci('pr5','getServerSideProps — fetch data on every request','Context has req, res, query · Return redirect for auth guard')}
        {ci('pr6','Preview Mode / Draft Mode — bypass SSG for content previews','res.setPreviewData() · Used with headless CMS (Contentful, Sanity)')}
        {ci('pr7','Fast Refresh — React-specific HMR that preserves state','Built into Next.js dev server · Does full reload if hooks change order')}
      </SectionCard>
      <SectionCard icon="⚙" title="next.config.js & Build">
        {ci('cfg1','next.config.js — configure redirects, rewrites, headers, env','async redirects(), async rewrites() · output: "export" for static')}
        {ci('cfg2','next export — export fully static site (no server required)','output: "export" · No SSR, no image optimization API')}
        {ci('cfg3','Image optimization details — loader, domains, remotePatterns','remotePatterns for external domains · priority: true for LCP image')}
        {ci('cfg4','Webpack customization in next.config.js — config.module.rules')}
        {ci('cfg5','AMP support — Accelerated Mobile Pages in Next.js','export const config = { amp: true } · Hybrid AMP: amp: "hybrid"')}
      </SectionCard>
    </div>
  )
}