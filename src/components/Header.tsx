import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-custom-header-gradient shadow-md text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-red-800 transition-all duration-500 ease hover:scale-105 relative group">
            <span className="relative z-10">Pajarkadia</span>
            <span className="absolute -inset-1 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/products" className="transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-500 hover:rounded-full px-4 py-2">
              Productos
            </Link>
            <Link to="/categories" className="transition-all duration-500 ease-in-out hover:scale-105 hover:bg-red-500 hover:rounded-full px-4 py-2">
              Categorias
            </Link>
            <Link to="/about" className="transition-all duration-500 ease-in-out hover:scale-105 hover:bg-red-500 hover:rounded-full px-4 py-2">
              Acerca de
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/ticket" className="">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <span>Cuenta</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Perfil</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ordenes</Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Registrarse</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 