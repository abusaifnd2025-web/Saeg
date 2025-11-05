import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { useOrders } from '../../hooks/useOrders.js'
import { updateOrderStatus } from '../../services/orderService.js'
import { formatCurrency, formatDate } from '../../utils/format.js'

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export const AdminOrders = () => {
  const { orders, loading } = useOrders()
  const [updatingId, setUpdatingId] = useState(null)

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, status)
      toast.success('অর্ডার স্ট্যাটাস আপডেট হয়েছে')
    } catch (error) {
      console.error('Failed to update order', error)
      toast.error(error.message || 'স্ট্যাটাস পরিবর্তন করা যায়নি')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">অর্ডার তালিকা</h3>
          <p className="text-xs text-slate-500">মোট {orders.length} টি অর্ডার</p>
        </div>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold text-slate-900">অর্ডার #{order.id}</p>
                  <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(event) => handleStatusChange(order.id, event.target.value)}
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 focus:border-primary-400 focus:outline-none"
                    disabled={updatingId === order.id}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {updatingId === order.id && <Loader2 className="h-4 w-4 animate-spin text-primary-500" />}
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">গ্রাহকের তথ্য</p>
                  <p className="mt-2">নাম: {order.customer?.name}</p>
                  <p>ফোন: {order.customer?.phone}</p>
                  <p>ইমেইল: {order.customer?.email}</p>
                  {order.customer?.notes && <p>নোট: {order.customer.notes}</p>}
                </div>
                <div className="rounded-xl border border-dashed border-primary-200 p-4 text-sm">
                  <p className="font-semibold text-primary-600">পেমেন্ট</p>
                  <p className="mt-2 text-slate-600">মেথড: {order.paymentMethod?.toUpperCase()}</p>
                  <p className="text-slate-600">লেনদেন আইডি: {order.transactionId || '—'}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {formatCurrency(order.subtotal || 0)}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-100 bg-white p-4">
                <p className="text-sm font-semibold text-slate-800">পণ্য বিবরণ:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {order.items?.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                      <span>
                        {item.name} <span className="text-xs text-slate-400">× {item.quantity}</span>
                      </span>
                      <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {!orders.length && (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
              কোনো অর্ডার পাওয়া যায়নি। গ্রাহকের সক্রিয় অর্ডার এখানে দেখা যাবে।
            </div>
          )}
        </div>
      )}
    </section>
  )
}
