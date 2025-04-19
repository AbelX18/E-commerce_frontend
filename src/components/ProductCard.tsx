import { Link } from 'react-router-dom';
import { Product } from '../schema/productSchema'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const discountedPrice = product.price * (1 - product.discount / 100)

    return (
        <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <Link to={`/product/${product.id}`}>
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                    {product.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                            -{product.discount}%
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            {product.discount > 0 ? (
                                <>
                                    <span className="text-gray-500 line-through mr-2">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="text-red-500 font-bold">
                                        ${discountedPrice.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className="font-bold">${product.price.toFixed(2)}</span>
                            )}
                        </div>
                        <span className="text-sm text-gray-500">{product.category.name}</span>
                    </div>
                </div>
            </Link>
            <button className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Añadir al carrito
            </button>
        </div>
    );
} 