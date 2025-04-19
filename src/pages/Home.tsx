import { useEffect, useState } from 'react'
import { Product } from '../schema/productSchema'
import { getAllProducts } from '../api/ProductAPI'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const newestProducts = await getAllProducts({ 
          sortBy: 'newest',
          limit: 4
        })
        const discounted = await getAllProducts({ 
          sortBy: 'discount',
          limit: 4
        })   
        setFeaturedProducts(newestProducts)
        setDiscountedProducts(discounted)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sección de Productos Destacados (dejé que por default sean los más nuevos) */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sección de Productos en Oferta */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Ofertas Especiales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
} 