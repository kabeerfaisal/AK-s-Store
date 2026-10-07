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
import AdminHome from '../AdminPages/AdminHome'
import AdminLayout from '../layout/adminLayout'
import AdminDashboard from '../AdminPages/AdminHome'
import AdminProtectedRoute from '../Components/AdminProtectedRoutesComponent'
import AdminProductPage from '../AdminPages/AdminProductPage'

function AppRouter() {
  return (
    // <Routes>
    //   <Route path='/login' element={<LoginPage/>}/>
    //   <Route path='/register' element={<RegisterPage/>}/>
    //     <Route path='/' element={<HomePage/>}/>
    //     <Route path='/shop' element={<Shop/>}/>
    //   <Route element={<ProtectRouteComponent/>}>
    //     <Route path='/about' element={<About/>}/>
    //     <Route path='/contact' element={<Contact/>}/>
    //     <Route path='/shop/product-detail/:id' element={<ProductDetail/>}/>
    //     </Route>
    // </Routes>

    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

        <Route element={<UserLayout />}>
          <Route path='/' element={<HomePage />} />
      <Route element={<ProtectRouteComponent />}>
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/shop/product-detail/:id' element={<ProductDetail />} />
        </Route>
      </Route>

      <Route element={<AdminProtectedRoute/>}>
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/products' element={<AdminProductPage />} />

        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter