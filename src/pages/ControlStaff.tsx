import { useNavigate } from 'react-router-dom'
import TableStaff from '../components/Staff/TableStaff'
import AddStaffModal from '../components/Staff/AddStaffModal'
import { ThemeContext } from '../context/ThemeProvider'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { useContext } from 'react'

export default function ControlStaff() {
  const navigate = useNavigate()
  const { darkMode } = useContext(ThemeContext)
  
  return (
    <div className={clsx(
      "min-h-screen p-6 transition-colors duration-300",
      darkMode ? "bg-[#111014]" : "bg-gray-100"
    )}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <h1 className={clsx(
            "text-3xl md:text-4xl font-bold",
            darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
          )}>
            Staff Registrado
          </h1>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(location.pathname + "?newStaff=true")}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium",
              "transition-all duration-300 shadow-lg",
              "hover:shadow-xl hover:-translate-y-0.5",
              darkMode 
                ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 hover:shadow-red-900/40"
                : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 hover:shadow-blue-900/30",
              "text-white"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Agregar Staff
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={clsx(
            "rounded-xl overflow-hidden shadow-2xl border",
            darkMode 
              ? "bg-gray-800/80 border-gray-700 shadow-red-900/20" 
              : "bg-white border-gray-200 shadow-blue-900/10"
          )}
        >
          <TableStaff />
        </motion.div>
        
        <AddStaffModal />
      </div>
    </div>
  )
}