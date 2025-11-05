import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

import { db, firebaseEnabled } from '../lib/firebase'
import { mockProducts } from '../lib/mockData'

export const subscribeToProducts = (onData, onError) => {
  if (!firebaseEnabled) {
    onData(mockProducts)
    return () => {}
  }

  const productsRef = collection(db, 'products')
  const productsQuery = query(productsRef, orderBy('createdAt', 'desc'))

  return onSnapshot(
    productsQuery,
    (snapshot) => {
      const products = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }))
      onData(products)
    },
    (error) => {
      console.error('Failed to subscribe to products', error)
      onError?.(error)
    },
  )
}

export const createProduct = async (payload) => {
  if (!firebaseEnabled) {
    throw new Error('Firebase configuration missing. Add your credentials to enable admin actions.')
  }

  const productsRef = collection(db, 'products')

  await addDoc(productsRef, {
    ...payload,
    price: Number(payload.price),
    createdAt: serverTimestamp(),
    status: payload.status ?? 'active',
  })
}

export const updateProduct = async (id, payload) => {
  if (!firebaseEnabled) {
    throw new Error('Firebase configuration missing. Add your credentials to enable admin actions.')
  }

  const productRef = doc(db, 'products', id)

  const updates = {
    ...payload,
    updatedAt: serverTimestamp(),
  }

  if (payload.price !== undefined && payload.price !== null) {
    updates.price = Number(payload.price)
  }

  await updateDoc(productRef, updates)
}

export const deleteProduct = async (id) => {
  if (!firebaseEnabled) {
    throw new Error('Firebase configuration missing. Add your credentials to enable admin actions.')
  }

  const productRef = doc(db, 'products', id)
  await deleteDoc(productRef)
}
