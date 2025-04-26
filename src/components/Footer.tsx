import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="dark:bg-[#1b1b1b] bg-[#d3d3d3] text-gray-600 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-40">
          <div>
            <h2 className="text-3xl font-bold mb-4 dark:text-arkadia-gradient-dark text-arkadia-gradient">E-Commerce Demo</h2>
            <p className="dark:text-gray-400 text-gray-500">
              Tienda especializada en Cómics, Mangas, Merchandising y mucho más!!. Amamos lo que hacemos ❤
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Acceso rápido</h4>
            <ul className="space-y-2 dark:text-gray-400  text-gray-500">
              <li>
                <Link to="/products" className="dark:hover:text-white hover:text-orange-500">Productos</Link>
              </li>
              <li>
                <Link to="/categories" className="dark:hover:text-white hover:text-orange-500">Categorias</Link>
              </li>
              <li>
                <Link to="/about" className="dark:hover:text-white hover:text-orange-500">Acerca de</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-orange-500">
                <span className="font-semibold">Email:</span> arkadia.sgo@gmail.com
              </li>
              <li className="dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-orange-500">
                <span className="font-semibold">Telefono:</span> 0385 421-8736
              </li>
              <li className="dark:text-gray-400 dark:hover:text-white text-gray-500 hover:text-orange-500">
                <span className="font-semibold">Dirección:</span> Saenz Peña 223, Santiago del Estero, Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center dark:text-gray-400 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Arkadia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 