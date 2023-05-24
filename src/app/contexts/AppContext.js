/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useContext, createContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export default function AppProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  // The flow for setting authentication will change from provider to provider.
  const login = async (email, password) => {
    setLoading(false)
    setUser({
      email,
      fistName: 'John',
      lastName: 'Doe',
      organization: 'adklfadkmfa',
    })
  }

  const logout = async () => {
    setLoading(false)
    setUser(undefined)
  }

  return (
    <AppContext.Provider value={{
      user,
      loading,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  )
}