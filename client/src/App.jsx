import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Config/AppRouter'
import { CartProvider } from './hooks/CartHook'
import { AuthProvider } from './hooks/AuthHook'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <CartProvider>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
          </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
