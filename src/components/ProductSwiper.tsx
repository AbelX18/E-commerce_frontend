import { useRef, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    rating?: number;
}

interface ProductSwiperProps {
    title: string;
    products: Product[];
}

const ProductSwiper = ({ title, products }: ProductSwiperProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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
                    <ProductCard {...product} />
                </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSwiper; 