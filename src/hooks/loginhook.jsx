import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CartContext } from "./CartHook";

//1. create context
export let loginContext = createContext()

// 2. context provider
export function LoginProvider({ children }) {
    let Navigate = useNavigate()

    let [inputData, setInputData] = useState('')
    function InputChange(e) {
        setInputData(e.target.value)
    }

    let [isLogin, setIslogin] = useState(() => {
        let login = localStorage.getItem('isLogin')
        if (login) {
            return true
        } else {
            return false
        }
    })

    function login(e) {
        e.preventDefault();
        setIslogin(true)
        localStorage.setItem('isLogin', true)
        localStorage.setItem('email', inputData)
        Navigate('/')
        console.log('user login', inputData)
    }
    function logout() {
        localStorage.clear()
        setIslogin(false)
        setInputData('')
        Navigate('/')
    }
    return <loginContext.Provider value={{ login, logout, inputData, InputChange, isLogin }}>
        {children}
    </loginContext.Provider>
}