import { useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';
import { toast } from 'react-toastify';

//ERMANO ESTA PÁGINA ES DE SUPERPRUEBA PRRO NO SÉ BIEN COMO FUNCIONA ESTA LIB TODAVÍA PERO AKIANDAMIO

interface ProductSwiperProps {
    title: string;
    products: Product[];
}

const ProductSwiper = ({ title, products }: ProductSwiperProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        toast.success(`${product.title} added to cart!`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
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
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>
            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: isScrolling ? 'grabbing' : 'grab' }}
            >
                {products.map((product) => (
                <div key={product.id} className="flex-none w-64">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-medium">{product.title}</h3>
                            <p className="text-gray-600">${product.price.toFixed(2)}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
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