import { Link } from 'react-router-dom';
import { Product } from '../schema/productSchema';
import { clsx } from 'clsx';
import { ThemeContext } from '../context/ThemeProvider';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { useContext } from 'react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { darkMode } = useContext(ThemeContext);
    const { addToCart } = useCart();
    const discountedPrice = product.price * (1 - product.discount / 100);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} añadido al carrito!`, {
            position: "bottom-right",
            theme: darkMode ? "dark" : "light",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div
        className={clsx(
            'group relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-md sm:shadow-lg',
            darkMode
            ? 'bg-gray-800 border border-gray-700 shadow-red-900/20'
            : 'bg-white border border-gray-200 shadow-blue-900/20'
        )}
        >
        <Link to={`/product/${product.id}`} className="block">
            {/* Imagen */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
            />
            {product.discount > 0 && (
                <div
                className={clsx(
                    'absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg',
                    darkMode
                    ? 'bg-gradient-to-br from-red-600 to-red-900'
                    : 'bg-gradient-to-br from-blue-600 to-blue-900'
                )}
                >
                -{product.discount}%
                </div>
            )}
            </div>

            {/* Info */}
            <div className="p-4">
            <h3
                className={clsx(
                'text-base sm:text-lg font-semibold mb-2 line-clamp-2',
                darkMode ? 'text-gray-100' : 'text-gray-800'
                )}
            >
                {product.name}
            </h3>

            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm sm:text-base">
                {product.discount > 0 ? (
                    <>
                    <span
                        className={clsx(
                        'line-through mr-2',
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                        )}
                    >
                        ${product.price.toFixed(2)}
                    </span>
                    <span
                        className={clsx(
                        'font-bold',
                        darkMode ? 'text-red-400' : 'text-blue-600'
                        )}
                    >
                        ${discountedPrice.toFixed(2)}
                    </span>
                    </>
                ) : (
                    <span
                    className={clsx(
                        'font-bold',
                        darkMode ? 'text-red-300' : 'text-blue-700'
                    )}
                    >
                    ${product.price.toFixed(2)}
                    </span>
                )}
                </div>

                <span
                className={clsx(
                    'text-xs px-2 py-1 rounded',
                    darkMode
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-600'
                )}
                >
                {product.category.name}
                </span>
            </div>
            </div>
        </Link>

        <button
            onClick={handleAddToCart}
            className={clsx(
            'absolute bottom-4 right-4 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100',
            'transition-all duration-300 transform group-hover:-translate-y-1',
            'text-sm font-medium z-10',
            darkMode
                ? 'bg-gradient-to-r from-red-600 to-red-800 hover:shadow-lg hover:shadow-red-500/30'
                : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-lg hover:shadow-blue-500/30'
            )}
        >
            Añadir al carrito
        </button>
        </div>
    );
}
