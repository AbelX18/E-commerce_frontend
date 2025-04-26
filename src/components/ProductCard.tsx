import { Link } from 'react-router-dom';
import { Product } from '../schema/productSchema';
import { clsx } from 'clsx';
import { ThemeContext } from '../context/ThemeProvider';
import { useContext } from 'react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { darkMode } = useContext(ThemeContext);
    const discountedPrice = product.price * (1 - product.discount / 100);

    return (
        <div className={clsx(
            "group relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg",
            darkMode 
                ? "bg-gray-800 shadow-red-900/20" 
                : "bg-white shadow-blue-900/20"
        )}>
            <Link to={`/product/${product.id}`}>
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:brightness-90 transition-all duration-300"
                    />
                    {product.discount > 0 && (
                        <div className={clsx(
                            "absolute top-2 right-2 text-white px-2 py-1 rounded-full text-sm font-bold",
                            darkMode 
                                ? "bg-gradient-to-br from-red-600 to-red-900 shadow-md shadow-red-900/50" 
                                : "bg-gradient-to-br from-blue-600 to-blue-900 shadow-md shadow-blue-900/50"
                        )}>
                            -{product.discount}%
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className={clsx(
                        "text-lg font-semibold mb-2 line-clamp-2",
                        darkMode ? "text-gray-100" : "text-gray-800"
                    )}>
                        {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                        <div>
                            {product.discount > 0 ? (
                                <>
                                    <span className={clsx(
                                        "line-through mr-2",
                                        darkMode ? "text-gray-400" : "text-gray-500"
                                    )}>
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className={clsx(
                                        "font-bold",
                                        darkMode ? "text-red-400" : "text-blue-600"
                                    )}>
                                        ${discountedPrice.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className={clsx(
                                    "font-bold",
                                    darkMode ? "text-red-300" : "text-blue-700"
                                )}>
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <span className={clsx(
                            "text-sm",
                            darkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                            {product.category.name}
                        </span>
                    </div>
                </div>
            </Link>
            <button className={clsx(
                "absolute bottom-4 right-4 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100",
                "transition-all duration-300 transform group-hover:-translate-y-1",
                darkMode 
                    ? "bg-gradient-to-r from-red-600 to-red-800 hover:shadow-lg hover:shadow-red-500/30" 
                    : "bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-lg hover:shadow-blue-500/30"
            )}>
                Añadir al carrito
            </button>
        </div>
    );
}