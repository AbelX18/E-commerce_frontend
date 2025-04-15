import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

// Pajas
import Products from './pages/Products'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Ticket from './pages/Ticket'
import About from './pages/About'

// Componentes
import Header from './components/Header'
import Footer from './components/Footer'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Products />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Signup />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/ticket" element={<Ticket />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
              <Footer />
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
