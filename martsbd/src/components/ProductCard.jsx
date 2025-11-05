import { Star, Tag } from 'lucide-react'

import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/format.js'

export const ProductCard = ({ product }) => {
  const { addItem } = useCart()

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-600">
          <Tag className="h-3 w-3" />
          {product.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
            {product.description}
          </p>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-primary-600">{formatCurrency(product.price)}</p>
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              ৪.৯ রেটিং
            </div>
          </div>
          <button
            onClick={() => addItem(product)}
            className="w-full rounded-full bg-primary-600 py-2 text-sm font-semibold text-white transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            কার্টে যোগ করুন
          </button>
        </div>
      </div>
    </div>
  )
}
