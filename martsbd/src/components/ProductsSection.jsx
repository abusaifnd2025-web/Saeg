import { useMemo, useState } from 'react'

import { useProducts } from '../hooks/useProducts.js'
import { ProductCard } from './ProductCard.jsx'

const filterOptions = ['সব পণ্য', 'Design Tools', 'Creative Assets', 'Productivity', 'Entertainment']

export const ProductsSection = () => {
  const { products, loading } = useProducts()
  const [activeFilter, setActiveFilter] = useState('সব পণ্য')

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'সব পণ্য') return products
    return products.filter((product) => product.category === activeFilter)
  }, [activeFilter, products])

  return (
    <section id="products" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">বেস্ট সেলিং ডিজিটাল পণ্য</h2>
            <p className="mt-2 text-sm text-slate-500">
              রিয়েল-টাইম ইনভেন্টরি থেকে আপনার পছন্দের সাবস্ক্রিপশন ও লাইসেন্স নির্বাচন করুন।
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${activeFilter === option ? 'border-primary-500 bg-primary-500 text-white' : 'border-slate-200 text-slate-600 hover:border-primary-200 hover:text-primary-600'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {!filteredProducts.length && (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
                <h3 className="text-xl font-semibold text-slate-700">এই ক্যাটাগরিতে পণ্য আসছে</h3>
                <p className="mt-2 text-sm text-slate-500">
                  অনুগ্রহ করে পরে আবার চেক করুন অথবা আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
