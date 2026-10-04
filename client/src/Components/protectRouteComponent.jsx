import React, { useContext, useState } from 'react'
import { Outlet} from 'react-router-dom'
import RequireLogin from './RequiredLogin'
import { useAuth } from '../hooks/AuthHook'

function ProtectRouteComponent() {
  const {isLogin} = useAuth()
 if (isLogin) {
   return <Outlet/> 
 }else{
    return <RequireLogin/>
 }
}

export default ProtectRouteComponent