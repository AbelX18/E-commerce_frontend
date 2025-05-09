import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Category } from '../schema/categorySchema';
import { getAllCategories } from '../api/CategoryAPI';
import { getAllProducts } from '../api/ProductAPI';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { clsx } from 'clsx';
import { ThemeContext } from '../context/ThemeProvider';

const Header = () => {
  const { user, logout } = useAuth()
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext);
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
    
    if (!searchTerm && !selectedCategory) {
      return; 
    }

    try {
      const allProducts = await getAllProducts();
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

      navigate('/search-results', {
        state: {
          products: filteredProducts,
          searchTerm: searchTerm || '',
          category: selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || null : null
        }
      });

      setSearchTerm('');
      setSelectedCategory(null);
      
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <header className="bg-arkadia-header dark:bg-arkadia-header-dark shadow-md text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-4xl font-bold tracking-wider arkadia-blueshine dark:arkadia-darkshine">
            Arkadia Demo
          </Link>

          <div className="flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full search-arkadia"
                  aria-label="Buscar productos"
                />
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="dropdown-arkadia absolute right-0 top-0 h-full flex items-center pr-4"
                  aria-expanded={isDropdownOpen}
                  aria-label="Seleccionar categoría"
                >
                  <span className="flex items-center">
                    {selectedCategory 
                      ? categories.find(c => c.id === selectedCategory)?.name 
                      : 'Todas las categorías'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                {isDropdownOpen && (
                  <div 
                    className="dropdown-menu-arkadia absolute right-0 mt-1 w-48 py-1 z-50"
                    role="menu"
                  >
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsDropdownOpen(false);
                      }}
                      className="dropdown-item-arkadia"
                      role="menuitem"
                    >
                      Todas las categorías
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsDropdownOpen(false);
                        }}
                        className="dropdown-item-arkadia"
                        role="menuitem"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className={clsx(
                  'ml-2 flex items-center justify-center',
                  darkMode ? 'btn-darkadia' : 'btn-arkadia',
                  'min-w-[100px]' // Ancho mínimo para evitar saltos
                )}
                disabled={!searchTerm && !selectedCategory}
                aria-label="Buscar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Buscar
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/ticket" className={clsx(darkMode ? 'btn-darkadia' : 'btn-arkadia')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="dropdown-arkadia flex items-center space-x-2"
                >
                  <span>Cuenta</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {isProfileDropdownOpen && (
                  <div className="dropdown-menu-arkadia absolute right-0 mt-1 w-48 py-1">
                    <Link 
                      to="/profile" 
                      className="dropdown-item-arkadia"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Perfil
                    </Link>
                    <Link 
                      to="/orders" 
                      className="dropdown-item-arkadia"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Órdenes
                    </Link>
                    <button 
                      className="dropdown-item-arkadia"
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className={clsx(darkMode ? 'btn-darkadia' : 'btn-arkadia')}>Login</Link>
                <Link to="/register" className={clsx(darkMode ? 'btn-register-dark' : 'btn-register')}>Registrarse</Link>
                
              </div>
            )}
            <ThemeToggle/>
          </div>
        </div>
        
      </nav>
    </header>
  );
};

export default Header; 