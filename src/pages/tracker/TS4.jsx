import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'ts4'
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
export default function TS4() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Advanced TypeScript Patterns'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Advanced TypeScript Patterns" subtitle="Decorators, SOLID, DI, advanced type tricks" tags={['ts']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🎨" title="Decorators ⭐" defaultOpen>
        <div className="info-box info-yellow">Decorators are a TS/Stage-3 feature used heavily in NestJS, Angular, TypeORM. Enable @notation for metadata and class modification.</div>
        {ci('d1','Class decorators — modify or replace class constructor')}
        {ci('d2','Method decorators — wrap or replace methods')}
        {ci('d3','Property decorators — add metadata to properties')}
        {ci('d4','Parameter decorators — used in DI frameworks')}
        {ci('d5','Accessor decorators — applied to getters/setters')}
        {ci('d6','Decorator factories — decorator that returns a decorator')}
        {ci('d7','reflect-metadata — metadata API used with decorators in NestJS')}
        {ci('d8','experimentalDecorators & emitDecoratorMetadata tsconfig flags')}
      </SectionCard>
      <SectionCard icon="🔬" title="Advanced Type Tricks">
        {ci('at1','Template literal types — `${string}Id` for string-based type computation','type EventName = `on${Capitalize<string>}` · Combine with mapped types',true)}
        {ci('at2','Recursive types — type JSON = string | number | boolean | JSON[] | {...}')}
        {ci('at3','Variadic tuple types — spreading tuples in generic positions')}
        {ci('at4','Declaration files (.d.ts) — typing untyped JS libraries')}
        {ci('at5','Branded types / Nominal typing — prevent mixing semantically different strings','type UserId = string & { __brand: "UserId" }',true)}
      </SectionCard>
    </div>
  )
}