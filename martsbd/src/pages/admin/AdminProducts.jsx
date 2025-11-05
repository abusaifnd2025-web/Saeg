import { useEffect, useState } from 'react'
import { Pencil, PlusCircle, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { useProducts } from '../../hooks/useProducts.js'
import { createProduct, deleteProduct, updateProduct } from '../../services/productService.js'
import { formatCurrency } from '../../utils/format.js'

const initialForm = {
  name: '',
  category: '',
  price: '',
  description: '',
  imageUrl: '',
  status: 'active',
}

export const AdminProducts = () => {
  const { products, loading } = useProducts()
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!editingId) {
      setForm(initialForm)
    }
  }, [editingId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    const payload = {
      ...form,
      price: Number(form.price),
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload)
        toast.success('পণ্য আপডেট করা হয়েছে')
      } else {
        await createProduct(payload)
        toast.success('নতুন পণ্য যুক্ত করা হয়েছে')
      }
      setForm(initialForm)
      setEditingId(null)
    } catch (error) {
      console.error('Failed to save product', error)
      toast.error(error.message || 'পণ্য সংরক্ষণ করা যায়নি')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setForm({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      status: product.status || 'active',
    })
  }

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('আপনি কি নিশ্চিতভাবে এই পণ্য মুছে ফেলতে চান?')
    if (!confirmed) return

    try {
      await deleteProduct(productId)
      toast.success('পণ্য মুছে ফেলা হয়েছে')
    } catch (error) {
      console.error('Failed to delete product', error)
      toast.error(error.message || 'পণ্য মুছে ফেলা যায়নি')
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {editingId ? 'পণ্য সম্পাদনা' : 'নতুন পণ্য যুক্ত' }
            </h3>
            <p className="text-xs text-slate-500">
              {editingId ? 'প্রয়োজনীয় তথ্য পরিবর্তন করে সংরক্ষণ করুন।' : 'Firestore ডাটাবেসে নতুন পণ্য যুক্ত করুন।'}
            </p>
          </div>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null)
                setForm(initialForm)
              }}
              className="text-sm font-semibold text-primary-600 hover:text-primary-500"
            >
              নতুন এন্ট্রি
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="পণ্যের নাম"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none"
          />
          <input
            required
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="ক্যাটাগরি"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none"
          />
          <input
            required
            type="number"
            min="0"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="মূল্য (৳)"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
            <option value="paused">Paused</option>
          </select>
          <input
            required
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="ইমেজ URL"
            className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none"
          />
          <textarea
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="ছোট বিবরণ"
            className="md:col-span-2 h-24 rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-primary-400/60"
          >
            <PlusCircle className="h-4 w-4" />
            {editingId ? 'আপডেট সংরক্ষণ করুন' : 'পণ্য যুক্ত করুন'}
          </button>
        </form>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">পণ্য তালিকা</h3>
          <p className="text-xs text-slate-500">মোট {products.length} টি পণ্য</p>
        </div>

        {loading ? (
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-500">পণ্য</th>
                  <th className="px-4 py-3 font-semibold text-slate-500">ক্যাটাগরি</th>
                  <th className="px-4 py-3 font-semibold text-slate-500">মূল্য</th>
                  <th className="px-4 py-3 font-semibold text-slate-500">স্ট্যাটাস</th>
                  <th className="px-4 py-3 font-semibold text-slate-500">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{product.category}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.status === 'active'
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-amber-100 text-amber-600'
                        }`}
                      >
                        {product.status || 'active'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-slate-400">
                        <button
                          onClick={() => handleEdit(product)}
                          className="rounded-full p-2 hover:bg-primary-50 hover:text-primary-600"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full p-2 hover:bg-red-50 hover:text-red-500"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!products.length && (
              <div className="mt-8 rounded-3xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
                কোনো পণ্য পাওয়া যায়নি। উপরে ফর্ম থেকে নতুন পণ্য যোগ করুন।
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
