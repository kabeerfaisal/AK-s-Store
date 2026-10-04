import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Config/AppRouter'
import { APiProvider } from './hooks/ApiHook'
import { CartProvider } from './hooks/CartHook'
import { AuthProvider } from './hooks/AuthHook'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <APiProvider>
            <CartProvider>
              <AuthProvider>  
              <AppRouter />
              </AuthProvider>
            </CartProvider>
          </APiProvider>
      </BrowserRouter>
    </>
  )
}

export default App
