import { useState, useEffect } from 'react';
import ProductSwiper from '../components/ProductSwiper';
import { Product } from '../types/product';
import { fetchProducts } from '../services/productApi';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Por categoría <temporalmente>
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 px-4">Featured Products</h1>
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <ProductSwiper
          key={category}
          title={category}
          products={categoryProducts}
        />
      ))}
    </div>
  );
};

export default Products;
