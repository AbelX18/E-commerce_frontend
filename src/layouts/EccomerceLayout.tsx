import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { CartProvider } from "../context/CartContext"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from "../context/ThemeProvider"
import { clsx } from "clsx"

export default function EccomerceLayout() {
  return (
    <CartProvider>
      <ThemeProvider>
        <div className={clsx(
          "min-h-screen flex flex-col transition-colors duration-300",
          "bg-gray-100 text-gray-800 dark:bg-[#111014] dark:text-[#f5f5f5]"
        )}>
          <Header />
          
          <main className={clsx(
            "flex-grow transition-colors duration-300", 
            "bg-gray-50 dark:bg-[#0f0f12]" 
          )}>
            <div className={clsx("transition-all duration-300")}>
              <Outlet/>
            </div>
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
            theme="colored"
            toastClassName={clsx(
              "!rounded-xl !border !font-sans !shadow-lg",
              "dark:!bg-gray-800 dark:!border-gray-700 dark:!text-white",
              "!bg-white !border-gray-200 !text-gray-800"
            )}
            progressClassName={clsx(
              "!bg-gradient-to-r",
              "dark:from-red-600 dark:to-red-800",
              "from-blue-600 to-blue-800"
            )}
          />
        </div>
      </ThemeProvider>
    </CartProvider>
  )
}