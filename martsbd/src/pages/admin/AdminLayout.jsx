import { LogOut, PackageSearch, ShoppingBag } from 'lucide-react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'

import { useAdmin } from '../../context/AdminContext.jsx'

const adminLinks = [
  { to: '/admin/products', label: 'পণ্য ম্যানেজমেন্ট', icon: PackageSearch },
  { to: '/admin/orders', label: 'অর্ডার তালিকা', icon: ShoppingBag },
]

export const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdmin()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="grid min-h-screen grid-cols-[260px,1fr] bg-slate-50">
      <aside className="flex flex-col justify-between border-r border-slate-200 bg-white p-6">
        <div>
          <h1 className="text-lg font-semibold text-primary-600">Marts BD Admin</h1>
          <nav className="mt-8 flex flex-col gap-2">
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`
                }
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-red-300 hover:text-red-500"
        >
          <LogOut className="h-4 w-4" />
          লগআউট
        </button>
      </aside>
      <main className="overflow-y-auto">
        <div className="border-b border-slate-200 bg-white px-8 py-6">
          <h2 className="text-2xl font-semibold text-slate-900">অ্যাডমিন কন্ট্রোল প্যানেল</h2>
          <p className="mt-2 text-xs text-slate-500">
            পণ্য, অর্ডার এবং পেমেন্ট কার্যক্রম এখান থেকে পর্যবেক্ষণ করুন।
          </p>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
