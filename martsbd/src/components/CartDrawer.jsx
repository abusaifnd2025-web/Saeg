import { useEffect, useMemo, useState } from 'react'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { useCart } from '../context/CartContext.jsx'
import { paymentMethods } from '../lib/mockData.js'
import { createOrder } from '../services/orderService.js'
import { formatCurrency } from '../utils/format.js'

const initialFormState = {
  customerName: '',
  phone: '',
  email: '',
  paymentMethod: paymentMethods[0]?.id ?? 'bkash',
  transactionId: '',
  notes: '',
}

export const CartDrawer = ({ open, onClose }) => {
  const { items, subtotal, updateQuantity, removeItem, clearCart, cartId } = useCart()
  const [form, setForm] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setForm((prev) => ({ ...prev, transactionId: '' }))
    }
  }, [open])

  const canCheckout = useMemo(() => {
    return (
      items.length > 0 &&
      form.customerName.trim() &&
      form.phone.trim() &&
      form.email.trim()
    )
  }, [form.customerName, form.email, form.phone, items.length])

  const grandTotal = subtotal

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async (event) => {
    event.preventDefault()
    if (!items.length) {
      toast.error('কার্টে কোনো পণ্য নেই')
      return
    }

    if (!canCheckout) {
      toast.error('অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন')
      return
    }

    setIsSubmitting(true)
    try {
      const orderPayload = {
        items,
        subtotal: grandTotal,
        status: 'pending',
        cartId,
        paymentMethod: form.paymentMethod,
        transactionId: form.transactionId,
        customer: {
          name: form.customerName,
          phone: form.phone,
          email: form.email,
          notes: form.notes,
        },
      }

      const orderId = await createOrder(orderPayload)

      toast.success('অর্ডার গ্রহণ করা হয়েছে! সাপোর্ট টিম শীঘ্রই যোগাযোগ করবে।')
      clearCart()
      setForm(initialFormState)
      onClose()

      if (orderId) {
        toast.loading(`অর্ডার আইডি: ${orderId}`, { duration: 4000 })
      }
    } catch (error) {
      console.error('Checkout failed', error)
      toast.error('অর্ডার সম্পন্ন করা যায়নি। পরে আবার চেষ্টা করুন।')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/40 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">আপনার কার্ট</h3>
            <p className="text-xs text-slate-500">অর্ডার সম্পন্ন করুন মাত্র কয়েক ধাপে</p>
          </div>
          <button onClick={onClose} aria-label="Close cart" className="rounded-full p-2">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-sm text-slate-500">
              <p>আপনার কার্ট খালি। পণ্য নির্বাচন করে যোগ করুন।</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatCurrency(item.price)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 transition hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded-full p-1 text-slate-500 hover:bg-slate-100"
                        aria-label="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                        className="w-12 border-none bg-transparent text-center text-sm font-semibold"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-full p-1 text-slate-500 hover:bg-slate-100"
                        aria-label="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <p className="font-semibold text-slate-600">মোট</p>
            <p className="text-lg font-bold text-primary-600">{formatCurrency(grandTotal)}</p>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4 border-t border-slate-200 px-6 py-4">
          <div className="grid gap-3">
            <input
              required
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleFormChange}
              placeholder="পূর্ণ নাম"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none"
            />
            <input
              required
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleFormChange}
              placeholder="মোবাইল নম্বর"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none"
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="ইমেইল অ্যাড্রেস"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none"
            />
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleFormChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none"
            >
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="transactionId"
              value={form.transactionId}
              onChange={handleFormChange}
              placeholder="লেনদেন আইডি (যদি থাকে)"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none"
            />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleFormChange}
              placeholder="অতিরিক্ত নির্দেশনা (ঐচ্ছিক)"
              className="min-h-[80px] w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!canCheckout || isSubmitting}
            className="w-full rounded-full bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার সম্পন্ন করুন'}
          </button>
          <button
            type="button"
            onClick={clearCart}
            className="w-full rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-500 transition hover:border-red-400 hover:text-red-500"
          >
            কার্ট খালি করুন
          </button>
        </form>
      </aside>
    </div>
  )
}
