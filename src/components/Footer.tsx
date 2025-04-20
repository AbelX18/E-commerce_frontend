import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-40">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-arkadia-gradient">Arkadia</h2>
            <p className="text-gray-400">
              Tienda especializada en Cómics, Mangas, Merchandising y mucho más!!. Amamos lo que hacemos ❤
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Acceso rápido</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">Productos</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white">Categorias</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">Acerca de</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="font-semibold">Email:</span> arkadia.sgo@gmail.com
              </li>
              <li className="text-gray-400">
                <span className="font-semibold">Telefono:</span> 0385 421-8736
              </li>
              <li className="text-gray-400">
                <span className="font-semibold">Dirección:</span> Saenz Peña 223, Santiago del Estero, Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Arkadia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 