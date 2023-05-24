/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, createContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export default function AppProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  return (
    <AppContext.Provider value={{
      user,
      loading,
    }}>
      {children}
    </AppContext.Provider>
  )
}