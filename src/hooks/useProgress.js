import { useLocalStorage } from './useLocalStorage'
import { TRACKER_KEY } from '../utils/constants'

export function useProgress() {
  const [progress, setProgress] = useLocalStorage(TRACKER_KEY, {})

  const toggle = (pageId, itemId) => {
    const key = `${pageId}_${itemId}`
    setProgress(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const isChecked = (pageId, itemId) => {
    return !!progress[`${pageId}_${itemId}`]
  }

  const getPageStats = (pageId, items) => {
    const total = items.length
    const done = items.filter(id => progress[`${pageId}_${id}`]).length
    return { total, done, pct: total ? Math.round(done / total * 100) : 0 }
  }

  const getTotalStats = (allPageItems) => {
    let total = 0, done = 0
    allPageItems.forEach(({ pageId, items }) => {
      items.forEach(id => {
        total++
        if (progress[`${pageId}_${id}`]) done++
      })
    })
    return { total, done, pct: total ? Math.round(done / total * 100) : 0 }
  }

  const resetAll = () => setProgress({})

  return { progress, toggle, isChecked, getPageStats, getTotalStats, resetAll }
}