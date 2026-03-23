import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'

const PAGE_ID = 'js1'
const PAGE_ITEMS = ALL_PAGE_ITEMS.find(p => p.pageId === PAGE_ID)

function CI({ id, label, sub, star, pageId, toggle, isChecked, openAI, context }) {
  const checked = isChecked(pageId, id)
  return (
    <div className={`check-item ${checked ? 'done' : ''}`} onClick={() => toggle(pageId, id)}>
      <div className="check-box" />
      <div style={{ flex: 1 }}>
        <div className="check-label">
          {label} {star && <span className="diff-star">⭐</span>}
        </div>
        {sub && <div className="check-sub">{sub}</div>}
      </div>
      <button
        className="ai-btn"
        title="AI Study Notes"
        onClick={e => { e.stopPropagation(); openAI(label, context) }}
      >✦</button>
    </div>
  )
}

export default function JS1() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'JS Fundamentals'
  const ci = (id, label, sub, star) =>
    <CI key={id} id={id} label={label} sub={sub} star={star}
      pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />

  return (
    <div className="page-content">
      <PageHeader title="JS Fundamentals" subtitle="Must be 100% strong before interviews" tags={['js']} />
      <ProgressBar done={stats.done} total={stats.total} />

      <SectionCard icon="📦" title="Variables & Data Types" defaultOpen>
        {ci('v1','var, let, const — differences & best practices','var: function-scoped, hoisted · let/const: block-scoped, TDZ',true)}
        {ci('v2','Primitive types: string, number, boolean, null, undefined, symbol, bigint')}
        {ci('v3','Non-primitive types: Object, Array, Function')}
        {ci('v4','Type coercion & comparison: == vs ===',null,true)}
        {ci('v5','Operators: logical (&&, ||, !), arithmetic, ternary')}
        {ci('v6','Control flow: if-else, switch, for/while/do-while loops')}
        {ci('v7','Variable shadowing & illegal shadowing','Shadowing: inner scope var hides outer · Illegal: let/const can\'t shadow var in same scope',true)}
        {ci('v8','Short-circuit evaluation — &&, || return actual values','a && b: returns a if falsy, else b · a || b: returns a if truthy, else b')}
        {ci('v9','Implicit vs Explicit coercion','Implicit: JS converts automatically · Explicit: Number(), String(), Boolean()',true)}
        {ci('v10','Boxing — primitive wrapper objects (String, Number, Boolean)','Primitives auto-boxed when accessing methods')}
        {ci('v11','Labels in JavaScript — label:, break label, continue label','Named loop control · Rare in production but asked in interviews')}
        {ci('v12','globalThis — universal global object reference','Works in browser (window), Node.js (global), workers · ES2020')}
      </SectionCard>

      <SectionCard icon="⚡" title="Functions & Scope">
        {ci('f1','Function declaration vs expression','Declaration: hoisted · Expression: not hoisted, stored in var')}
        {ci('f2','Arrow functions — syntax & this binding difference')}
        {ci('f3','Scope: global, function, block')}
        {ci('f4','Hoisting — var, function, let/const TDZ')}
        {ci('f5','this keyword — all 4 rules',null,true)}
        {ci('f6','Default parameters, rest parameters')}
        {ci('f7','IIFE (Immediately Invoked Function Expression) & modern alternatives','IIFE: (function(){})() for isolation · Modern: block scope with let/const')}
        {ci('f8','eval() — what it does & why it\'s dangerous','Executes string as code · Security: XSS vector · Performance: disables engine optimizations')}
        {ci('f9','Error object properties — message, name, stack','name: error type · message: description · stack: call stack trace',true)}
        {ci('f10','"use strict" mode — behavior changes, silent error prevention','Prevents silent errors, no undeclared vars, this is undefined in plain functions',true)}
        {ci('f11','typeof vs instanceof — common confusion','typeof null === "object" trap · instanceof checks prototype chain',true)}
        {ci('f12','Error types — TypeError, RangeError, ReferenceError, SyntaxError','Know which error each scenario produces')}
        {ci('f13','Comma operator — (a=1, b=2) evaluates both, returns last')}
      </SectionCard>
    </div>
  )
}