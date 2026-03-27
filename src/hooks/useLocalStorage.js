import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.detail && e.detail.key === key) {
        setStoredValue(e.detail.newValue)
      } else if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue)
        } catch {}
      }
    }
    window.addEventListener('local-storage-update', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('local-storage-update', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, initialValue])

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      window.dispatchEvent(new CustomEvent('local-storage-update', {
        detail: { key, newValue: valueToStore }
      }))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}