import { createContext, useContext, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const ADMIN_TOKEN_KEY = 'martsbd_admin_token'
const DEFAULT_PASSCODE = 'martsbd-admin'

const AdminContext = createContext(null)

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(window.localStorage.getItem(ADMIN_TOKEN_KEY)),
  )
  const [loading, setLoading] = useState(false)

  const expectedPasscode = import.meta.env.VITE_ADMIN_PASSCODE || DEFAULT_PASSCODE

  const login = async (passcode) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (passcode === expectedPasscode) {
      window.localStorage.setItem(ADMIN_TOKEN_KEY, 'authenticated')
      setIsAuthenticated(true)
      toast.success('অ্যাডমিন প্যানেলে প্রবেশ করা হয়েছে')
      setLoading(false)
      return
    }

    toast.error('ভুল পাসকোড। আবার চেষ্টা করুন।')
    setLoading(false)
    throw new Error('Invalid passcode')
  }

  const logout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY)
    setIsAuthenticated(false)
  }

  const value = useMemo(
    () => ({ isAuthenticated, loading, login, logout }),
    [isAuthenticated, loading],
  )

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}
