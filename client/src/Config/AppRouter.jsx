import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/Home'
import Contact from '../Pages/Contact'
import About from '../Pages/About'
import Shop from '../Pages/Shop'
import ProductDetail from '../Pages/ProductDetail'
import LoginPage from '../Pages/LoginPage'
import ProtectRouteComponent from '../Components/protectRouteComponent'
import RegisterPage from '../Pages/registerPage'
import UserLayout from '../layout/userLayout'
import AdminLayout from '../layout/adminLayout'
import AdminDashboard from '../AdminPages/AdminHome'
import AdminProtectedRoute from '../Components/AdminProtectedRoutesComponent'
import AdminProductPage from '../AdminPages/AdminProductPage'
import ProductsByCategory from '../Pages/ProductsByCategory'
import Checkout from '../Pages/CheckoutPage'
import OrderSuccess from '../Components/user/orderSuccess'
import MyOrders from '../Pages/MyOrders'
import AdminOrders from '../AdminPages/AdminOrder'

function AppRouter() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

        <Route element={<UserLayout />}>
          <Route path='/' element={<HomePage />} />
      <Route element={<ProtectRouteComponent />}>
          <Route path='/shop' element={<Shop />} />
          <Route path='/category/:id' element={<ProductsByCategory />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/shop/product-detail/:id' element={<ProductDetail />} />
          <Route path='/checkout' element= {<Checkout/>} />
          <Route path='/order-success/:id' element= {<OrderSuccess/>} />
          <Route path='/orders' element= {<MyOrders/>} />

        </Route>
      </Route>

      <Route element={<AdminProtectedRoute/>}>
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/products' element={<AdminProductPage />} />
          <Route path='/admin/orders' element={<AdminOrders />} />

        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter