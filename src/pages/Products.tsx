import { useState, useEffect } from 'react';
import ProductSwiper from '../components/ProductSwiper';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    {/* temporal */}
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error consultando los datos de los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
