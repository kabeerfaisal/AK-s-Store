import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/Home'
import Contact from '../Pages/Contact'
import About from '../Pages/About'
import Shop from '../Pages/Shop'
import ProductDetail from '../Pages/ProductDetail'
import LoginPage from '../Pages/LoginPage'
import ProtectRouteComponent from '../Components/protectRouteComponent'

function AppRouter() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/shop' element={<Shop/>}/>
      <Route element={<ProtectRouteComponent/>}>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/shop/product-detail/:id' element={<ProductDetail/>}/>
        </Route>
    </Routes>
  )
}

export default AppRouter