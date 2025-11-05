import { Menu, ShoppingCart, Store, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'পণ্যসমূহ', href: '#products' },
  { label: 'ফিচার', href: '#features' },
  { label: 'পেমেন্ট', href: '#payments' },
  { label: 'যোগাযোগ', href: '#contact' },
]

export const Navbar = ({ onCartOpen, cartCount }) => {
  const [open, setOpen] = useState(false)

  const cartBadge = useMemo(() => {
    if (!cartCount) return null
    return (
      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-slate-900">
        {cartCount}
      </span>
    )
  }, [cartCount])

  return (
    <header className="sticky top-0 z-40 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-primary-700">
          <Store className="h-6 w-6" />
          Marts BD Digital
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-primary-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <NavLink
            to="/admin"
            className="flex items-center gap-2 rounded-full border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-600 transition hover:border-primary-300 hover:bg-primary-50"
          >
            <User className="h-4 w-4" />
            অ্যাডমিন প্যানেল
          </NavLink>
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-500"
          >
            <ShoppingCart className="h-4 w-4" />
            কার্ট
            {cartBadge}
          </button>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center rounded-full border border-slate-200 p-2 text-slate-600 md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-primary-50 hover:text-primary-600"
              >
                {item.label}
              </a>
            ))}
            <NavLink
              to="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-primary-600"
            >
              <User className="h-4 w-4" />
              অ্যাডমিন প্যানেল
            </NavLink>
            <button
              onClick={() => {
                onCartOpen()
                setOpen(false)
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              কার্ট ({cartCount})
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
