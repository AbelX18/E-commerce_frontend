import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Tienda virtual Arkadia</h3>
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
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contacto</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">Información de envío</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white">Devoluciones</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Politica de privacidad</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="font-semibold">Email:</span> nosequemailponer@ecommerce.com
              </li>
              <li className="text-gray-400">
                <span className="font-semibold">Telefono:</span> +1 (111) 123-4567
              </li>
              <li className="text-gray-400">
                <span className="font-semibold">Dirección:</span> Santiago del estero (por desgracia)
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Masturcomerce. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 