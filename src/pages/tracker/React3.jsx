import { useContext } from 'react'
import { useProgress } from '../../hooks/useProgress'
import { AIContext } from '../../components/layout/Layout'
import SectionCard from '../../components/tracker/SectionCard'
import ProgressBar from '../../components/tracker/ProgressBar'
import PageHeader from '../../components/tracker/PageHeader'
import { ALL_PAGE_ITEMS } from '../../data/topics'
const PAGE_ID = 'react3'
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
export default function React3() {
  const { toggle, isChecked, getPageStats } = useProgress()
  const { openAI } = useContext(AIContext)
  const stats = getPageStats(PAGE_ID, PAGE_ITEMS.items)
  const ctx = 'Redux & State Management'
  const ci = (id, l, s, star) => <CI key={id} id={id} label={l} sub={s} star={star} pageId={PAGE_ID} toggle={toggle} isChecked={isChecked} openAI={openAI} context={ctx} />
  return (
    <div className="page-content">
      <PageHeader title="Redux & State Management" subtitle="Redux Toolkit, Thunk, Saga, Context API comparison" tags={['react','redux']} />
      <ProgressBar done={stats.done} total={stats.total} />
      <SectionCard icon="🔴" title="Redux Core Concepts ⭐" defaultOpen>
        <div className="info-box info-blue">Flow: Action → Reducer → Store → UI (via useSelector/useDispatch)</div>
        {ci('rd1','What is Redux — centralized state, predictable')}
        {ci('rd2','Store, Actions, Reducers, Dispatch',null,true)}
        {ci('rd3','Redux Toolkit — createSlice, configureStore',null,true)}
        {ci('rd4','useSelector & useDispatch hooks')}
        {ci('rd5','Thunk middleware — async API calls in Redux',null,true)}
        {ci('rd6','Loading & error states pattern in Redux')}
        {ci('rd7','Redux vs Context API — when to use which')}
        {ci('rd8','Redux DevTools setup & usage')}
        {ci('rd9','createAsyncThunk — async action with pending/fulfilled/rejected','Auto-dispatches pending/fulfilled/rejected actions · Handle in extraReducers',true)}
        {ci('rd10','extraReducers — handle actions from other slices or createAsyncThunk','builder.addCase(fetchUser.fulfilled, (state, action) => ...)')}
        {ci('rd11','combineReducers — split state into domain slices')}
        {ci('rd12','mapStateToProps / mapDispatchToProps — legacy connect() API','Pre-hooks approach · Still asked in interviews')}
        {ci('rd13','Redux Saga — side-effect management with generators','Uses generators: function* · call(), put(), takeEvery(), takeLatest()',true)}
        {ci('rd14','Redux Persist — persist and rehydrate Redux state','Saves to localStorage · persistReducer + persistStore · Whitelist/blacklist')}
        {ci('rd15','Flux architecture — original pattern Redux is based on','Dispatcher → Stores → Views (unidirectional)')}
      </SectionCard>
    </div>
  )
}