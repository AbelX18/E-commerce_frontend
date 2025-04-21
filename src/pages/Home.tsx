import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../schema/productSchema'
import { getAllProducts } from '../api/ProductAPI'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts()
        
        // Filtrar productos destacados
        const featured = allProducts.filter(product => product.featured)
        setFeaturedProducts(featured)

        // Obtener productos más nuevos
        const newest = await getAllProducts({ 
          sortBy: 'newest',
          limit: 4
        })
        setNewProducts(newest)

        // Obtener productos con descuento
        const discounted = await getAllProducts({ 
          sortBy: 'discount',
          limit: 4
        })   
        setDiscountedProducts(discounted)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sección de Productos Destacados */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Productos Destacados</h2>
          <Link 
            to="/products" 
            className="btn-arkadia px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Ver todos los productos
          </Link>
        </div>
        {featuredProducts.length === 0 ? (
          <p className="text-gray-500 text-lg">
            No hay productos destacados en este momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Sección de Novedades */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Novedades</h2>
        {newProducts.length === 0 ? (
          <p className="text-gray-500 text-lg">
            No hay productos nuevos en este momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Sección de Productos en Oferta */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Ofertas Especiales</h2>
        {discountedProducts.length === 0 ? (
          <p className="text-gray-500 text-lg">
            No hay ofertas especiales en este momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
} 