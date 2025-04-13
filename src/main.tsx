import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Products from './pages/Products'
import StaffLayout from './layouts/StaffLayout'
import Staff from './pages/Staff'
import EccomerceLayout from './layouts/EccomerceLayout'
import ControlProducts from './pages/ControlProducts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ControlStaff from './pages/ControlStaff'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        
        <Route element={<EccomerceLayout/>}>
          <Route path="/" element={<Products />} />
          
        </Route>

        <Route element={<StaffLayout/>} >
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff/products" element={<ControlProducts/>} />
          <Route path='/staff/user' element={<ControlStaff/>} />
        </Route>

      </Routes>
    </Router>
    </QueryClientProvider>
  </StrictMode>
)
