import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'

// Páginas
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Ticket from './pages/Ticket'
import About from './pages/About'
import Categories from './pages/Categories'
import CategoryProducts from './pages/CategoryProducts'
import EccomerceLayout from './layouts/EccomerceLayout'
import StaffLayout from './layouts/StaffLayout'
import ControlProducts from './pages/ControlProducts'
import Staff from './pages/Staff'
import ControlCategories from './pages/ControlCategories'
import ControlStaff from './pages/ControlStaff'
import DemoSuccess from './pages/Demo/DemoSuccess'
import SearchResults from './pages/SearchResults'
import DemoPending from './pages/Demo/DemoPending'
import DemoFailure from './pages/Demo/DemoFailure'
import { AuthProvider } from './context/AuthContext'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  [
    {
      element: <EccomerceLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/products', element: <Products /> },
        { path: '/categories', element: <Categories /> },
        { path: '/categories/:id', element: <CategoryProducts /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Signup /> },
        { path: '/ticket', element: <Ticket /> },
        { path: '/about', element: <About /> },
        { path: '/success', element: <DemoSuccess/> },
        { path: '/pending', element: <DemoPending/> },
        { path: '/pending', element: <DemoFailure/> },
        { path: '/search-results', element: <SearchResults /> },
      ],
    },
    {
      element: <StaffLayout />,
      children: [
        { path: '/staff/main', element: <Staff /> },
        { path: '/staff/products', element: <ControlProducts /> },
        { path: '/staff/categories', element: <ControlCategories /> },
        { path: '/staff/user', element: <ControlStaff /> },
      ],
    },
  ],
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
