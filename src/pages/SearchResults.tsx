import { useLocation } from 'react-router-dom';
import { Product } from '../schema/productSchema';
import ProductCard from '../components/ProductCard';

interface SearchResultsState {
  products: Product[];
  searchTerm: string;
  category: string | null;
}

export default function SearchResults() {
  const location = useLocation();
  const { products, searchTerm, category } = location.state as SearchResultsState;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Resultados de búsqueda
        {searchTerm && ` para "${searchTerm}"`}
        {category && ` en la categoría "${category}"`}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No se encontraron productos que coincidan con tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 