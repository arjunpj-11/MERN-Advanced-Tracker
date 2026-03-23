import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'js4'
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
export default function JS4() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Advanced JavaScript'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Advanced JavaScript" subtitle="Prototypes, patterns, and performance techniques" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🧬" title="Prototypes & Inheritance ⭐" defaultOpen>
        {ci('pr1','Prototype chain — __proto__ vs prototype')}
        {ci('pr2','Inheritance in JS — old way & ES6 class way')}
        {ci('pr3','class, constructor, extends, super')}
        {ci('pr4','instanceof, hasOwnProperty')}
        {ci('pr5','bind(), call(), apply() — differences','call(ctx,...args) · apply(ctx,[args]) · bind returns new fn',true)}
        {ci('pr6','Function borrowing — call/apply/bind practical patterns','Borrow Array methods for array-like objects · Explicit this for method reuse',true)}
      </SectionCard>
      <SectionCard icon="⚡" title="Performance Patterns ⭐">
        {ci('pp1','Debouncing — delay execution until user stops',null,true)}
        {ci('pp2','Throttling — execute at most once per interval')}
        {ci('pp3','Memoization — cache expensive function results')}
        {ci('pp4','Currying — f(a)(b)(c)')}
        {ci('pp5','Generators & Iterators — function*, yield')}
        {ci('pp6','ES6 Modules — import/export, named vs default')}
        {ci('pp7','Functional programming — pure functions, immutability')}
        {ci('pp8','Design patterns — Factory, Singleton, Observer')}
        {ci('pp9','Proxy objects — intercept object operations','new Proxy(target, handler) with get/set/has traps · Used in Vue 3 reactivity',true)}
        {ci('pp10','WeakRef — weak reference to object, allows GC','new WeakRef(obj) · .deref() returns object or undefined if collected')}
        {ci('pp11','Polyfills — implementing missing browser features manually','Polyfill vs transpiling · if(!Array.prototype.flat) ...')}
      </SectionCard>
      <SectionCard icon="🏗" title="Memory & Security">
        {ci('ms1','Garbage collection — mark & sweep')}
        {ci('ms2','Memory leaks — common causes & fixes')}
        {ci('ms3','XSS — Cross-site scripting attack & prevention')}
        {ci('ms4','CSRF — Cross-site request forgery')}
        {ci('ms5','Input validation & sanitization')}
      </SectionCard>
    </div>
  )
}