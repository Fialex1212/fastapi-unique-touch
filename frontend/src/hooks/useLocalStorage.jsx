import { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [ storedValue, setStoredValue ] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) { return JSON.parse(item) }
      else {
        localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      }
    } catch (error) { console.warn('An error occured reading value: ', error) }
  })

  const setValue = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      setStoredValue(value)
    } catch (error) { console.warn('An error occured setting new value: ', error) }
  }

  return [storedValue, setValue]
}

export default useLocalStorage