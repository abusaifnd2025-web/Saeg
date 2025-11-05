import { useEffect, useState } from 'react'

import { subscribeToProducts } from '../services/productService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToProducts(
      (productList) => {
        setProducts(productList)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return () => unsubscribe?.()
  }, [])

  return { products, loading, error }
}
