import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Config/AppRouter'
import { LoginProvider } from './hooks/loginhook'
import { APiProvider } from './hooks/ApiHook'
import { CartProvider } from './hooks/CartHook'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <LoginProvider>
          <APiProvider>
            <CartProvider>
              <AppRouter />
            </CartProvider>
          </APiProvider>
        </LoginProvider>
      </BrowserRouter>
    </>
  )
}

export default App
