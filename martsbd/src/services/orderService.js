import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

import { db, firebaseEnabled } from '../lib/firebase'
import { mockOrders } from '../lib/mockData'

export const subscribeToOrders = (onData, onError) => {
  if (!firebaseEnabled) {
    onData(mockOrders)
    return () => {}
  }

  const ordersRef = collection(db, 'orders')
  const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'))

  return onSnapshot(
    ordersQuery,
    (snapshot) => {
      const orders = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }))
      onData(orders)
    },
    (error) => {
      console.error('Failed to subscribe to orders', error)
      onError?.(error)
    },
  )
}

export const createOrder = async (payload) => {
  if (!firebaseEnabled) {
    console.warn('Firebase configuration missing. Order will not be persisted.')
    return null
  }

  const ordersRef = collection(db, 'orders')

  const docRef = await addDoc(ordersRef, {
    ...payload,
    status: payload.status ?? 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

export const updateOrderStatus = async (orderId, status) => {
  if (!firebaseEnabled) {
    throw new Error('Firebase configuration missing. Add your credentials to enable admin actions.')
  }

  const orderRef = doc(db, 'orders', orderId)

  await updateDoc(orderRef, {
    status,
    updatedAt: serverTimestamp(),
  })
}
