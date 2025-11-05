import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'

import { db, firebaseEnabled } from '../lib/firebase'

const CART_STORAGE_KEY = 'martsbd_cart_id'
const CART_FALLBACK_KEY = 'martsbd_cart_fallback'

const CartContext = createContext(null)

const ensureCartId = () => {
  const existing = window.localStorage.getItem(CART_STORAGE_KEY)
  if (existing) return existing

  const generated = crypto.randomUUID()
  window.localStorage.setItem(CART_STORAGE_KEY, generated)
  return generated
}

const loadFallbackCart = () => {
  try {
    const raw = window.localStorage.getItem(CART_FALLBACK_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (error) {
    console.warn('Failed to parse fallback cart', error)
    return []
  }
}

const saveFallbackCart = (items) => {
  window.localStorage.setItem(CART_FALLBACK_KEY, JSON.stringify(items))
}

export const CartProvider = ({ children }) => {
  const [cartId] = useState(() => ensureCartId())
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const persistCart = useCallback(
    async (nextItems) => {
      if (!firebaseEnabled || !db) {
        saveFallbackCart(nextItems)
        return
      }

      try {
        const cartRef = doc(db, 'carts', cartId)
        const nextSubtotal = nextItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        )
        const nextTotalItems = nextItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        )
        await setDoc(
          cartRef,
          {
            items: nextItems,
            subtotal: nextSubtotal,
            totalItems: nextTotalItems,
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        )
      } catch (error) {
        console.error('Failed to persist cart', error)
        toast.error('কার্ট আপডেট করা যায়নি। আবার চেষ্টা করুন।')
      }
    },
    [cartId],
  )

  useEffect(() => {
    const loadCart = async () => {
      if (!firebaseEnabled || !db) {
        setItems(loadFallbackCart())
        setLoading(false)
        return
      }

      try {
        const cartRef = doc(db, 'carts', cartId)
        const snapshot = await getDoc(cartRef)

        if (snapshot.exists()) {
          setItems(snapshot.data().items ?? [])
        } else {
          await setDoc(cartRef, {
            items: [],
            subtotal: 0,
            totalItems: 0,
            createdAt: serverTimestamp(),
          })
        }
      } catch (error) {
        console.error('Failed to load cart', error)
        setItems(loadFallbackCart())
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [cartId])

  const pushUpdates = useCallback(
    (updater) => {
      setItems((prev) => {
        const nextState = updater(prev)
        persistCart(nextState)
        return nextState
      })
    },
    [persistCart],
  )

  const addItem = useCallback(
    (product) => {
      pushUpdates((prev) => {
        const existing = prev.find((item) => item.id === product.id)
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        }

        toast.success('পণ্য কার্টে যোগ করা হয়েছে')
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
          },
        ]
      })
    },
    [pushUpdates],
  )

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        removeItem(productId)
        return
      }

      pushUpdates((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: Number(quantity) } : item,
        ),
      )
    },
    [pushUpdates],
  )

  const removeItem = useCallback(
    (productId) => {
      pushUpdates((prev) => prev.filter((item) => item.id !== productId))
    },
    [pushUpdates],
  )

  const clearCart = useCallback(() => {
    pushUpdates(() => [])
  }, [pushUpdates])

  const value = useMemo(
    () => ({
      cartId,
      items,
      totalItems,
      subtotal,
      loading,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, cartId, clearCart, items, loading, removeItem, subtotal, totalItems, updateQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
