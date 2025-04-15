import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Pajas
import Products from './pages/Products'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Ticket from './pages/Ticket'
import About from './pages/About'
import EccomerceLayout from './layouts/EccomerceLayout'
import StaffLayout from './layouts/StaffLayout'
import ControlProducts from './pages/ControlProducts'
import Staff from './pages/Staff'
import ControlCategories from './pages/ControlCategories'
import ControlStaff from './pages/ControlStaff'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route element={<EccomerceLayout/>}>
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/products" element={<Products />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/about" element={<About />} />
              </Route>


              <Route element={<StaffLayout/>}>
                <Route path='/staff/main' element={<Staff/>}/>
                <Route path="/staff/products" element={<ControlProducts/>}/>
                <Route path="/staff/categories" element={<ControlCategories/>}/>
                <Route path="/staff/user" element={<ControlStaff/>}/>
              </Route>

            </Routes>
          </Router>


    </QueryClientProvider>
  </StrictMode>,
)
