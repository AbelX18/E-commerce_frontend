import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import MercadoPagoButton from '../components/Payment/MercadoPagoButton';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { createPreference } from '../api/MPagoAPI';
import { clsx } from 'clsx';
import { ThemeContext } from '../context/ThemeProvider';

const Ticket = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const { user } = useAuth()
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const preferenceId = await createPreference({
        items: items.map(item => ({
          id: item.id,
          title: item.name,
          unit_price: item.price,
          quantity: item.quantity,
        })),
        total,
        userId: user!.sub, 
      });
      setPreferenceId(preferenceId);
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      toast.error('Error al procesar el pago');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className={clsx(
          "text-3xl font-bold mb-4",
          darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
        )}>
          Tu Carrito
        </h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="dark:text-white text-gray-600 mb-4">Tu carrito está vacío</p>
          <button
            onClick={() => navigate('/products')}
            className={clsx("px-4 py-2 rounded-md", darkMode ? "btn-register-dark": "btn-register")}
          >
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tu Carrito</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <div key={item.id} className="p-4 flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 text-gray-900 dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900 dark:text-white">Total:</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
          </div>
          {!preferenceId ? (
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className={clsx(
                "mt-4 w-full",
                darkMode ? "btn-darkadia" : "btn-arkadia"
              )}
            >
              {isLoading ? 'Procesando...' : 'Proceder al Pago'}
            </button>
          ) : (
            <div className="mt-4">
              <MercadoPagoButton
                preferenceId={preferenceId}
                onSuccess={() => {
                  toast.success('¡Pago realizado con éxito!');
                  navigate('/products');
                }}
                onError={() => {
                  toast.error('Error en el pago');
                  setPreferenceId(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );  
};

export default Ticket; 