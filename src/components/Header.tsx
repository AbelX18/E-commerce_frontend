import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Category } from '../schema/categorySchema';
import { getAllCategories } from '../api/CategoryAPI';
import { getAllProducts } from '../api/ProductAPI';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { clsx } from 'clsx';
import { ThemeContext } from '../context/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm && !selectedCategory) return;

    try {
      const allProducts = await getAllProducts();
      let filtered = allProducts;

      if (searchTerm) {
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (selectedCategory) {
        filtered = filtered.filter(p => p.categoryId === selectedCategory);
      }

      navigate('/search-results', {
        state: {
          products: filtered,
          searchTerm,
          category: selectedCategory
            ? categories.find(c => c.id === selectedCategory)?.name || null
            : null
        }
      });

      setSearchTerm('');
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <>
      <header className="bg-arkadia-header dark:bg-arkadia-header-dark shadow-md text-white">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap">
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link to="/" className="text-4xl font-bold tracking-wider arkadia-blueshine dark:arkadia-darkshine whitespace-nowrap">
              Arkadia Demo
            </Link>
            <button
              className="md:hidden ml-auto focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center justify-center flex-grow gap-6 mt-4 md:mt-0">
            <form onSubmit={handleSearch} className="flex flex-grow max-w-[600px] items-center gap-2">
              <div className="relative w-full">
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
                  {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'Categorías'}
                  <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu-arkadia absolute right-0 mt-1 w-48 z-50">
                    <button onClick={() => {
                      setSelectedCategory(null);
                      setIsDropdownOpen(false);
                    }} className="dropdown-item-arkadia">Todas las categorías</button>
                    {categories.map((c) => (
                      <button key={c.id} onClick={() => {
                        setSelectedCategory(c.id);
                        setIsDropdownOpen(false);
                      }} className="dropdown-item-arkadia">{c.name}</button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className={clsx(darkMode ? 'btn-darkadia' : 'btn-arkadia', 'min-w-[100px]')}
                disabled={!searchTerm && !selectedCategory}
              >
                Buscar
              </button>
            </form>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              <Link to="/ticket" className={clsx(darkMode ? 'btn-darkadia' : 'btn-arkadia')}>
                Carrito
              </Link>

              {user ? (
                <div className="relative">
                  <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="dropdown-arkadia">
                    Cuenta
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="dropdown-menu-arkadia absolute right-0 mt-1 w-48 z-50">
                      <Link to="/profile" className="dropdown-item-arkadia">Perfil</Link>
                      <Link to="/orders" className="dropdown-item-arkadia">Órdenes</Link>
                      <button onClick={logout} className="dropdown-item-arkadia">Cerrar Sesión</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  <Link to="/login" className={clsx(darkMode ? 'btn-darkadia' : 'btn-arkadia')}>Login</Link>
                  <Link to="/register" className={clsx(darkMode ? 'btn-register-dark' : 'btn-register')}>Registrarse</Link>
                </div>
              )}
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-arkadia-header dark:bg-arkadia-header-dark text-white px-4 py-4 md:hidden space-y-4"
          >
            <form onSubmit={handleSearch} className="space-y-2">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full search-arkadia"
              />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
                className="w-full input-arkadia"
              >
                <option value="">Todas las categorías</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className={clsx(darkMode ? 'btn-darkadia' : 'btn-arkadia', 'w-full')}
                disabled={!searchTerm && !selectedCategory}
              >
                Buscar
              </button>
            </form>

            <Link to="/ticket" className={clsx(darkMode ? 'btn-darkadia' : 'btn-arkadia', 'block w-full text-center')}>
              Carrito
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="dropdown-item-arkadia block">Perfil</Link>
                <Link to="/orders" className="dropdown-item-arkadia block">Órdenes</Link>
                <button onClick={logout} className="dropdown-item-arkadia block">Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link to="/login" className={clsx(darkMode ? 'btn-darkadia' : 'btn-arkadia', 'block w-full text-center')}>
                  Login
                </Link>
                <Link to="/register" className={clsx(darkMode ? 'btn-register-dark' : 'btn-register', 'block w-full text-center')}>
                  Registrarse
                </Link>
              </>
            )}
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;