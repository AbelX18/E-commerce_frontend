import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    rating?: number;
}

const ProductCard = ({ id, title, price, image, category, rating }: ProductCardProps) => {
    return (
        <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <Link to={`/product/${id}`}>
                <div className="aspect-w-16 aspect-h-9">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500">{category}</span>
                    </div>
                    {rating && (
                        <div className="flex items-center mt-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-1">({rating})</span>
                        </div>
                    )}
                </div>
            </Link>
            <button className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Añadir al carrito
            </button>
        </div>
    );
};

export default ProductCard; 