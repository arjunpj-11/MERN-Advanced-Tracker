import { useContext } from 'react'
import { AIContext } from '../layout/Layout'

export default function CheckItem({ pageId, itemId, label, sub, star, children }) {
  const { openAI } = useContext(AIContext)
  const { toggle, isChecked } = useProgressContext()

  return null // implemented inline in pages for performance
}

// We use this helper hook in pages instead
import { useProgress } from '../../hooks/useProgress'
export function usePageProgress(pageId) {
  return useProgress()
}