import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import AIPanel from '../ai/AIPanel'
import AIKeyModal from '../ai/AIKeyModal'
import { useProgress } from '../../hooks/useProgress'
import { useAI } from '../../hooks/useAI'
import { SIDEBAR_CONFIG } from '../../data/sidebarConfig'
import { ALL_PAGE_ITEMS } from '../../data/topics'

import React from 'react'
export const AIContext = React.createContext(null)
React.createContext(null)

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [aiTopic, setAiTopic] = useState(null)
  const [keyModalOpen, setKeyModalOpen] = useState(false)
  const location = useLocation()
  const { getTotalStats } = useProgress()
  const ai = useAI()

  const stats = getTotalStats(ALL_PAGE_ITEMS)

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const openAI = (label, context) => {
    if (!ai.hasKey) { setKeyModalOpen(true); return }
    setAiTopic({ label, context })
    setAiPanelOpen(true)
  }

  const currentPageName = () => {
    const all = SIDEBAR_CONFIG.flatMap(g => g.items)
    const found = all.find(i => i.path === location.pathname)
    return found?.label || ''
  }

  return (
    <AIContext.Provider value={{ openAI, hasKey: ai.hasKey }}>
      <div className="app">
        <div
          className={`overlay ${sidebarOpen ? 'visible' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="main-content">
          <Topbar
            onMenuClick={() => setSidebarOpen(true)}
            stats={stats}
            pageName={currentPageName()}
            hasKey={ai.hasKey}
            onAIClick={() => setKeyModalOpen(true)}
          />
          <Outlet />
        </div>

        <AIPanel
          open={aiPanelOpen}
          topic={aiTopic}
          onClose={() => setAiPanelOpen(false)}
          ai={ai}
        />

        <AIKeyModal
          open={keyModalOpen}
          onClose={() => setKeyModalOpen(false)}
          ai={ai}
        />
      </div>
    </AIContext.Provider>
  )
}