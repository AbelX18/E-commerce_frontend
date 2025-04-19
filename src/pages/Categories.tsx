import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../schema/categorySchema'
import { getAllCategories } from '../api/CategoryAPI'

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Categorías</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
            <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-6 text-center"
            >
                <h2 className="text-xl font-semibold">{category.name}</h2>
            </Link>
            ))}
        </div>
        </div>
    )
} 