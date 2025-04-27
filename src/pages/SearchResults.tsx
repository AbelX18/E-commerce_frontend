import { useLocation } from 'react-router-dom';
import { Product } from '../schema/productSchema';
import ProductCard from '../components/ProductCard';
import { ThemeContext } from '../context/ThemeProvider';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useContext } from 'react';

interface SearchResultsState {
  products: Product[];
  searchTerm: string;
  category: string | null;
}

export default function SearchResults() {
  const location = useLocation();
  const { products, searchTerm, category } = location.state as SearchResultsState;
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={clsx(
      "min-h-screen py-12 transition-colors duration-300",
      darkMode ? "bg-[#111014]" : "bg-gray-100"
    )}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className={clsx(
            "text-3xl md:text-4xl font-bold mb-4",
            darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
          )}>
            Resultados de búsqueda
            {searchTerm && (
              <span className={clsx(
                "block md:inline",
                darkMode ? "text-gray-300" : "text-gray-700"
              )}>
                {` para "${searchTerm}"`}
              </span>
            )}
            {category && (
              <span className={clsx(
                "block md:inline md:ml-2",
                darkMode ? "text-gray-300" : "text-gray-700"
              )}>
                {` en ${category}`}
              </span>
            )}
          </h1>

          <div className={clsx(
            "w-full h-0.5 my-4",
            darkMode ? "bg-gradient-to-r from-red-900/50 to-red-500/30" : "bg-gradient-to-r from-blue-900/30 to-blue-500/20"
          )} />
        </motion.div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={clsx(
              "text-center py-16 rounded-xl",
              darkMode ? "bg-gray-800/50 text-gray-400" : "bg-white text-gray-500"
            )}
          >
            <p className="text-xl mb-6">
              No se encontraron productos que coincidan con tu búsqueda
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
              className={clsx(
                "px-6 py-2 rounded-lg font-medium transition-all",
                "hover:shadow-lg hover:-translate-y-0.5",
                darkMode 
                  ? "bg-red-900/30 text-white hover:bg-red-900/40 hover:shadow-red-900/40"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-blue-900/20"
              )}
            >
              Volver a intentar
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
  );
}