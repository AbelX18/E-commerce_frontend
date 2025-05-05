import { useState, useEffect, useContext } from 'react';
import ProductSwiper from '../components/ProductSwiper';
import { Product } from '../schema/productSchema';
import { getAllProducts } from '../api/ProductAPI';
import { ThemeContext } from '../context/ThemeProvider';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category.name]) {
      acc[product.category.name] = [];
    }
    acc[product.category.name].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className={clsx(
          "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2",
          darkMode ? "border-red-500" : "border-blue-500"
        )}></div>
      </div>
    );
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
          Nuestros Productos
        </motion.h1>

        {Object.entries(productsByCategory).map(([category, categoryProducts], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-16"
          >
            <div className={clsx(
              "mb-6 flex items-center justify-between px-2",
              darkMode ? "border-b border-red-900/50" : "border-b border-blue-900/30"
            )}>
              <h2 className={clsx(
                "text-2xl font-bold",
                darkMode ? "text-gray-100" : "text-gray-800"
              )}>
                {category}
              </h2>
              <Link 
                to={`/categories/${categoryProducts[0].categoryId}`}
                className={clsx(
                  "text-sm px-3 py-1 rounded-full transition-all",
                  "hover:shadow-md hover:-translate-y-0.5",
                  darkMode 
                    ? "bg-red-900/30 text-red-300 hover:bg-red-900/40 hover:shadow-red-900/40"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-blue-900/20"
                )}
              >
                Ver todos
              </Link>
            </div>
            
            <ProductSwiper
              key={category}
              title={category}
              products={categoryProducts}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;