import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { AuthProvider } from "../context/AuthContext"
import { CartProvider } from "../context/CartContext"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function EccomerceLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow dark:bg-[#111014]">
                <Outlet/>
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
      </CartProvider>
    </AuthProvider>
  )
}