import { useEffect, useState } from 'react'

import { subscribeToOrders } from '../services/orderService'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToOrders(
      (orderList) => {
        setOrders(orderList)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return () => unsubscribe?.()
  }, [])

  return { orders, loading, error }
}
