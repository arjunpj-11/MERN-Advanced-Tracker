import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'ts1'
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
export default function TS1() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'TypeScript Fundamentals'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="TypeScript Fundamentals" subtitle="Types, interfaces, functions, and OOP in TS" tags={['ts']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔷" title="Basic Types & Annotations" defaultOpen>
        {ci('t1','What is TypeScript & why use it — type safety at compile time')}
        {ci('t2','Basic types: string, number, boolean, null, undefined')}
        {ci('t3','Special types: any, unknown, void, never','any: bypass · unknown: safe any · void: no return · never: unreachable',true)}
        {ci('t4','Type inference vs explicit annotation')}
        {ci('t5','Arrays, tuples — number[], [string, number]')}
        {ci('t6','Union types (|) & Intersection types (&)')}
        {ci('t7','Literal types: "success" | "error" | "loading"')}
        {ci('t8','Enums — const enums vs regular enums','const enums are inlined at compile time (no runtime object)',true)}
      </SectionCard>
      <SectionCard icon="📐" title="Interface vs Type Alias ⭐ Very Common Q">
        <div className="info-box info-blue">interface: Objects & classes, extends, declaration merging ✅ | type: Primitives, unions, tuples, & intersection, no merging ❌</div>
        {ci('int1','Interface — optional(?), readonly, extends')}
        {ci('int2','Type alias — union, intersection, mapped types')}
        {ci('int3','Declaration merging (interfaces only)',null,true)}
        {ci('int4','Function types, overloads')}
        {ci('int5','Module augmentation — extend third-party types','declare module "express" { interface Request { user?: User } }')}
        {ci('int6','Namespace — TS namespaces vs ES modules','Avoid in modern code · Still used in .d.ts declaration files')}
      </SectionCard>
      <SectionCard icon="🏗" title="OOP in TypeScript">
        {ci('oop1','Classes with types, constructor shorthand')}
        {ci('oop2','Access modifiers: public, private, protected, readonly')}
        {ci('oop3','Inheritance — extends, super')}
        {ci('oop4','Abstract classes',null,true)}
        {ci('oop5','Implementing interfaces in classes')}
        {ci('oop6','Structural typing & duck typing')}
        {ci('oop7','Type assertions (as) & non-null assertion (!)')}
        {ci('oop8','tsconfig.json — strict, target, module, esModuleInterop')}
        {ci('oop9','Mixins pattern — compose classes from multiple reusable pieces','TS doesn\'t have multiple inheritance · Mixin: function takes class, returns extended class')}
        {ci('oop10','SOLID principles in TypeScript','S: Single Responsibility · O: Open/Closed · L: Liskov · I: Interface Segregation · D: Dependency Inversion',true)}
        {ci('oop11','Dependency injection (DI) — pass dependencies, don\'t create them','Constructor injection · Interface-based DI · Enables testability · NestJS uses DI heavily')}
      </SectionCard>
    </div>
  )
}