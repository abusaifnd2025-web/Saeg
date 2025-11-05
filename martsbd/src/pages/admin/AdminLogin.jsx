import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAdmin } from '../../context/AdminContext.jsx'

export const AdminLogin = () => {
  const [passcode, setPasscode] = useState('')
  const { login, loading, isAuthenticated } = useAdmin()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from || '/admin/products'
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, location.state, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!passcode.trim()) return

    try {
      await login(passcode.trim())
    } catch (error) {
      console.error('Failed to login', error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white">অ্যাডমিন যাচাই</h1>
        <p className="mt-2 text-sm text-slate-400">
          অ্যাডমিন প্যানেলে প্রবেশের জন্য নিরাপদ পাসকোড প্রদান করুন। পাসকোড .env ফাইলে পরিবর্তন করতে পারবেন।
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            placeholder="Admin Passcode"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white focus:border-primary-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary-500 py-3 text-sm font-semibold text-white transition hover:bg-primary-400 disabled:cursor-not-allowed disabled:bg-primary-500/60"
          >
            {loading ? 'যাচাই হচ্ছে...' : 'অ্যাডমিন প্যানেলে প্রবেশ করুন'}
          </button>
        </form>
      </div>
    </div>
  )
}
