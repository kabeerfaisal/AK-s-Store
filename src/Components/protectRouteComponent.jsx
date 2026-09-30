import React, { useContext, useState } from 'react'
import { Outlet} from 'react-router-dom'
import RequireLogin from './RequiredLogin'
import { loginContext } from '../hooks/loginhook'

function ProtectRouteComponent() {
   //  let [isLogin,setIslogin] = useState(()=>{
   //     let login = localStorage.getItem('isLogin')
   //     if (login) {
   //      return true
   //     }else{
   //      return false
   //     }
   //  })
   let {isLogin} = useContext(loginContext)
 if (isLogin) {
   return <Outlet/> 
 }else{
    return <RequireLogin/>
 }
}

export default ProtectRouteComponent