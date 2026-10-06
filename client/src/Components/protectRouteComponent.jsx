import React, { useContext, useState } from 'react'
import { Outlet} from 'react-router-dom'
import RequireLogin from './RequiredLogin'
import { useAuth } from '../hooks/AuthHook'

function ProtectRouteComponent() {
  const {isLogin} = useAuth()
  const {token} = useAuth()
 if (isLogin && token && token !== null) {
   return <Outlet/> 
 }else{
    return <RequireLogin/>
 }
}

export default ProtectRouteComponent