import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../schema/categorySchema'
import { getAllCategories } from '../api/CategoryAPI'
import { ThemeContext } from '../context/ThemeProvider'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories()
                setCategories(data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className={clsx(
                    "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2",
                    darkMode ? "border-red-500" : "border-blue-500"
                )}></div>
            </div>
        )
    }

    return (
        <div className={clsx(
            "min-h-screen py-12 transition-colors",
            darkMode ? "bg-[#111014]" : "bg-gray-100"
        )}>
            <div className="container mx-auto px-4">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={clsx(
                        "text-4xl font-bold mb-12 text-center",
                        darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
                    )}
                >
                    Categorías
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={`/categories/${category.id}`}
                                className={clsx(
                                    "group relative block rounded-xl p-8 text-center transition-all duration-300",
                                    "hover:shadow-xl hover:-translate-y-2",
                                    darkMode 
                                        ? "bg-gray-800 shadow-lg shadow-red-900/20 hover:shadow-red-900/40 border border-gray-700 hover:border-red-500/50"
                                        : "bg-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 border border-gray-200 hover:border-blue-500/50"
                                )}
                            >
                                <div className={clsx(
                                    "w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center",
                                    "transition-all duration-300 group-hover:scale-110",
                                    darkMode 
                                        ? "bg-red-900/20 text-red-400 group-hover:bg-red-900/30 group-hover:text-red-300"
                                        : "bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700"
                                )}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                </div>
                                <h2 className={clsx(
                                    "text-xl font-semibold mb-2 transition-colors duration-300",
                                    darkMode ? "text-gray-100 group-hover:text-red-400" : "text-gray-800 group-hover:text-blue-600"
                                )}>
                                    {category.name}
                                </h2>
                                <span className={clsx(
                                    "text-sm px-3 py-1 rounded-full inline-block",
                                    darkMode 
                                        ? "bg-gray-700 text-gray-300 group-hover:bg-red-900/40 group-hover:text-white"
                                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                                )}>
                                    Ver productos
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}