import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../schema/productSchema'
import { Category } from '../schema/categorySchema'
import { getAllProducts } from '../api/ProductAPI'
import { getCategoryById } from '../api/CategoryAPI'
import ProductCard from '../components/ProductCard'

export default function CategoryProducts() {
  const { id } = useParams<{ id: string }>()
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Categoría no encontrada</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category.name}</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos en esta categoría</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
} 