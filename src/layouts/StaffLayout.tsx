import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "../context/ThemeProvider";
import { clsx } from "clsx";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { getRoleFromToken } from "../utils/jwt";

export default function StaffLayout() {
  const { darkMode } = useContext(ThemeContext);
  const { user, loading } = useAuth();
  const role = getRoleFromToken()

  if (loading) return <p>Cargando...</p>;

  if (!user || role === 'BUYER') {
    return <Navigate to="/404" replace />;
  }
  return (
    <>
      <Sidebar />
      <div className={clsx(
        "flex min-h-screen transition-colors duration-300 ",
        darkMode ? "bg-[#111014]" : "bg-gray-100"
      )}>    
        <main className={clsx(
          "flex-grow p-6 transition-colors duration-300",
          "overflow-y-auto max-h-screen",
          darkMode ? "bg-gray-900/50" : "bg-gray-50"
        )}>
          <div className={clsx(
            "rounded-xl p-6 min-h-[calc(100vh-48px)]",
            darkMode ? "bg-gray-800/80 border border-gray-700" : "bg-white border border-gray-200",
            "shadow-2xl",
            darkMode ? "shadow-red-900/20" : "shadow-blue-900/10"
          )}>
            <Outlet />
          </div>
        </main>
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme={darkMode ? "dark" : "light"}
        toastClassName={clsx(
          "!rounded-xl !border !font-sans",
          darkMode ? "!bg-gray-800 !border-gray-700" : "!bg-white !border-gray-200"
        )}
        progressClassName={clsx(
          darkMode ? "!bg-red-500" : "!bg-blue-500"
        )}
      />
    </>
  );
}