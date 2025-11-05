import { useState } from 'react'

import { CartDrawer } from '../components/CartDrawer.jsx'
import { FAQ } from '../components/FAQ.jsx'
import { FeatureHighlights } from '../components/FeatureHighlights.jsx'
import { Footer } from '../components/Footer.jsx'
import { Hero } from '../components/Hero.jsx'
import { Navbar } from '../components/Navbar.jsx'
import { PaymentOptions } from '../components/PaymentOptions.jsx'
import { ProductsSection } from '../components/ProductsSection.jsx'
import { useCart } from '../context/CartContext.jsx'

const trustBadges = [
  { title: '৫০০০+ অর্ডার', description: 'লাইসেন্স ও সাবস্ক্রিপশন সফলভাবে ডেলিভারড' },
  { title: '৯৮% সন্তুষ্ট গ্রাহক', description: 'ইনস্ট্যান্ট সাপোর্ট ও কার্যকর সমাধান' },
  { title: '১০ মিনিট ডেলিভারি', description: 'অটোমেটেড প্রক্রিয়ায় দেরি ছাড়াই কী পাঠানো' },
]

export const StorefrontPage = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartOpen={() => setCartOpen(true)} cartCount={totalItems} />
      <main>
        <Hero onCartOpen={() => setCartOpen(true)} />
        <section className="bg-white py-8">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center"
              >
                <p className="text-lg font-semibold text-primary-600">{badge.title}</p>
                <p className="mt-2 text-xs text-slate-500">{badge.description}</p>
              </div>
            ))}
          </div>
        </section>
        <ProductsSection />
        <FeatureHighlights />
        <PaymentOptions />
        <FAQ />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
