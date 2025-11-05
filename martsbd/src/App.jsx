import { Navigate, Route, Routes } from 'react-router-dom'

import { StorefrontPage } from './pages/StorefrontPage.jsx'
import { AdminLayout } from './pages/admin/AdminLayout.jsx'
import { AdminLogin } from './pages/admin/AdminLogin.jsx'
import { AdminOrders } from './pages/admin/AdminOrders.jsx'
import { AdminProducts } from './pages/admin/AdminProducts.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StorefrontPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
