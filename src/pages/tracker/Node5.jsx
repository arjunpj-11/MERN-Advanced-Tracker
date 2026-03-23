import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'node5'
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
export default function Node5() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'WebSockets, GraphQL & Architecture'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="WebSockets, GraphQL & Architecture" subtitle="Real-time apps, GraphQL, microservices & system design" tags={['node']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔌" title="WebSockets & Real-Time" defaultOpen>
        <div className="info-box info-yellow">HTTP is request-response (half-duplex). WebSocket is full-duplex — both sides can send any time.</div>
        {ci('ws1','WebSocket protocol — handshake upgrade from HTTP')}
        {ci('ws2','Socket.io — rooms, namespaces, emit/on, broadcasting',null,true)}
        {ci('ws3','Socket.io rooms — grouping clients for targeted messages')}
        {ci('ws4','SSE (Server-Sent Events) — one-way server push, simpler than WS')}
        {ci('ws5','Long polling — fallback for environments without WS support')}
        {ci('ws6','Scaling WebSockets — Redis pub/sub with Socket.io adapter')}
      </SectionCard>
      <SectionCard icon="⬡" title="GraphQL Basics">
        {ci('gql1','What is GraphQL — query language for APIs, single endpoint')}
        {ci('gql2','GraphQL vs REST — over-fetching, under-fetching, flexibility')}
        {ci('gql3','Schema, Types, Queries, Mutations, Subscriptions')}
        {ci('gql4','Resolvers — how data is fetched for each field')}
        {ci('gql5','Apollo Server with Express')}
        {ci('gql6','N+1 problem & DataLoader for batching')}
      </SectionCard>
      <SectionCard icon="🏗" title="Architecture & System Design">
        {ci('ar1','Monolith vs Microservices — tradeoffs, when to use each')}
        {ci('ar2','MVC architecture — clean separation of concerns',null,true)}
        {ci('ar3','API Gateway — single entry point, routing, auth, rate limiting')}
        {ci('ar4','Message queues — RabbitMQ, Kafka basics (async communication)')}
        {ci('ar5','Redis — caching, session storage, pub/sub')}
        {ci('ar6','Horizontal vs vertical scaling')}
        {ci('ar7','Load balancing — round-robin, sticky sessions')}
        {ci('ar8','Docker basics — Dockerfile, containers, docker-compose')}
        {ci('ar9','CI/CD pipeline — GitHub Actions basics')}
        {ci('ar10','12-factor app principles')}
      </SectionCard>
    </div>
  )
}