import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Category } from '../schema/categorySchema';
import { getAllCategories } from '../api/CategoryAPI';
import { getAllProducts } from '../api/ProductAPI';
import { Product } from '../schema/productSchema';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Obtener todos los productos
      const allProducts = await getAllProducts();
      
      // Filtrar productos según el término de búsqueda y la categoría seleccionada
      let filteredProducts = allProducts;
      
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product =>
          product.categoryId === selectedCategory
        );
      }

      // Navegar a la página de resultados de búsqueda
      navigate('/search-results', {
        state: {
          products: filteredProducts,
          searchTerm,
          category: selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : null
        }
      });
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <header className="bg-arkadia-test3finalfinal shadow-md text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-4xl font-bold tracking-wider arkadia-darkshine">
            Arkadia Demo
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full search-arkadia"
                />
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="dropdown-arkadia absolute right-0 top-0 h-full flex items-center pr-4"
                >
                  <span className="flex items-center">
                    {selectedCategory 
                      ? categories.find(c => c.id === selectedCategory)?.name 
                      : 'Categorías'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu-arkadia absolute right-0 mt-1 w-48 py-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsDropdownOpen(false);
                        }}
                        className="dropdown-item-arkadia"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="ml-2 btn-arkadia"
              >
                Buscar
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/ticket" className="btn-arkadia">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 btn-arkadia">
                  <span>Cuenta</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link to="/profile" className="block btn-arkadia">Perfil</Link>
                  <Link to="/orders" className="block btn-arkadia">Ordenes</Link>
                  <button className="block btn-register">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="btn-arkadia">Login</Link>
                <Link to="/register" className="btn-register">Registrarse</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 