import { useContext, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../schema/productSchema';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeProvider';
import { clsx } from 'clsx';

interface ProductSwiperProps {
    title: string;
    products: Product[];
}

const ProductSwiper = ({ title, products }: ProductSwiperProps) => {
    const { darkMode } = useContext(ThemeContext);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
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

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsScrolling(true);
        setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
        setScrollLeft(containerRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - (containerRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsScrolling(false);
    };

    const handleMouseLeave = () => {
        setIsScrolling(false);
    };

    return (
        <div className="mb-12">
            <h2 className={clsx(
                "text-3xl font-bold mb-6 px-4",
                darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
            )}>
                {title}
            </h2>
            
            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-6 px-4 pb-6 scrollbar-hide"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: isScrolling ? 'grabbing' : 'grab' }}
            >
                {products.map((product) => (
                    <div key={product.id} className="flex-none w-72">
                        <div className={clsx(
                            "group relative rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl",
                            darkMode 
                                ? "bg-gray-800 border border-gray-700 hover:border-red-500/30" 
                                : "bg-white border border-gray-200 hover:border-blue-500/30"
                        )}>
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {product.discount > 0 && (
                                    <div className={clsx(
                                        "absolute top-3 right-3 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg",
                                        darkMode 
                                            ? "bg-gradient-to-br from-red-600 to-red-900" 
                                            : "bg-gradient-to-br from-blue-600 to-blue-900"
                                    )}>
                                        -{product.discount}%
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-5">
                                <h3 className={clsx(
                                    "text-lg font-semibold mb-2 line-clamp-2",
                                    darkMode ? "text-gray-100" : "text-gray-800"
                                )}>
                                    {product.name}
                                </h3>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <p className={clsx(
                                        "text-xl font-bold",
                                        darkMode ? "text-red-400" : "text-blue-600"
                                    )}>
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <span className={clsx(
                                        "text-sm px-2 py-1 rounded",
                                        darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                                    )}>
                                        {product.category.name}
                                    </span>
                                </div>
                                
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className={clsx(
                                        "w-full py-2 rounded-md font-medium transition-all duration-300",
                                        "hover:shadow-lg hover:translate-y-[-2px]",
                                        darkMode 
                                            ? "bg-gradient-to-r from-red-600 to-red-800 hover:shadow-red-500/30" 
                                            : "bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-blue-500/30",
                                        "text-white"
                                    )}
                                >
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSwiper;