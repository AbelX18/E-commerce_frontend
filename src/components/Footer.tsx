import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="dark:bg-[#1b1b1b] bg-[#d3d3d3] text-gray-600 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-arkadia-gradient dark:text-arkadia-gradient-dark">
              E-Commerce Demo
            </h2>
            <p className="text-sm sm:text-base dark:text-gray-400 text-gray-500">
              Tienda especializada en Cómics, Mangas, Merchandising y mucho más!!. Amamos lo que hacemos ❤
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Acceso rápido</h4>
            <ul className="space-y-2 text-sm sm:text-base dark:text-gray-400 text-gray-500">
              <li>
                <Link to="/products" className="hover:text-orange-500 dark:hover:text-white">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-orange-500 dark:hover:text-white">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-500 dark:hover:text-white">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="dark:text-gray-400 hover:text-orange-500 dark:hover:text-white">
                <span className="font-semibold">Email:</span> arkadia.sgo@gmail.com
              </li>
              <li className="dark:text-gray-400 hover:text-orange-500 dark:hover:text-white">
                <span className="font-semibold">Teléfono:</span> 0385 421-8736
              </li>
              <li className="dark:text-gray-400 hover:text-orange-500 dark:hover:text-white">
                <span className="font-semibold">Dirección:</span> Saenz Peña 223, Santiago del Estero, Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-400 dark:border-gray-700 mt-8 pt-6 text-center text-sm sm:text-base dark:text-gray-400 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Arkadia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
