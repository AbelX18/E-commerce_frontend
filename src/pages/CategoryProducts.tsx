import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Product } from '../schema/productSchema'
import { Category } from '../schema/categorySchema'
import { getAllProducts } from '../api/ProductAPI'
import { getCategoryById } from '../api/CategoryAPI'
import ProductCard from '../components/ProductCard'
import { ThemeContext } from '../context/ThemeProvider'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export default function CategoryProducts() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return

        const categoryData = await getCategoryById(parseInt(id))
        setCategory(categoryData)

        const productsData = await getAllProducts()
        
        const categoryProducts = productsData.filter(
          product => product.categoryId === parseInt(id)
        )
        
        setProducts(categoryProducts)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

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

  if (!category) {
    return (
      <div className={clsx(
        "min-h-screen flex flex-col items-center justify-center px-4",
        darkMode ? "bg-[#111014]" : "bg-gray-100"
      )}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={clsx(
            "text-4xl font-bold mb-6 text-center",
            darkMode ? "text-red-400" : "text-blue-600"
          )}
        >
          Categoría no encontrada
        </motion.h1>
        <Link
          to="/categories"
          className={clsx(
            "px-6 py-3 rounded-lg font-medium transition-all",
            "hover:shadow-lg hover:-translate-y-0.5",
            darkMode 
              ? "bg-red-900/30 text-white hover:bg-red-900/40 hover:shadow-red-900/40"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-blue-900/20"
          )}
        >
          Volver a categorías
        </Link>
      </div>
    )
  }

  return (
    <div className={clsx(
      "min-h-screen py-12 transition-colors",
      darkMode ? "bg-[#111014]" : "bg-gray-100"
    )}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
        >
          <div>
            <h1 className={clsx(
              "text-4xl font-bold mb-2",
              darkMode ? "text-gray-100" : "text-gray-800"
            )}>
              {category.name}
            </h1>
            <p className={clsx(
              "text-lg",
              darkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {category.name || 'Explora nuestros productos'}
            </p>
          </div>
          
          <Link
            to="/categories"
            className={clsx(
              "mt-4 md:mt-0 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              "hover:shadow-md hover:-translate-y-0.5",
              darkMode 
                ? "bg-red-900/30 text-white hover:bg-red-900/40 hover:shadow-red-900/40"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-blue-900/20"
            )}
          >
            ← Volver a categorías
          </Link>
        </motion.div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={clsx(
              "text-center py-16 rounded-xl",
              darkMode ? "bg-gray-800/50" : "bg-white"
            )}
          >
            <p className={clsx(
              "text-xl mb-6",
              darkMode ? "text-gray-400" : "text-gray-500"
            )}>
              No hay productos en esta categoría
            </p>
            <Link
              to="/products"
              className={clsx(
                "px-6 py-2 rounded-lg font-medium inline-block",
                "hover:shadow-lg hover:-translate-y-0.5 transition-all",
                darkMode 
                  ? "bg-red-900/30 text-white hover:bg-red-900/40 hover:shadow-red-900/40"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-blue-900/20"
              )}
            >
              Ver todos los productos
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}