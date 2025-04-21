import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MercadoPagoButton from '../components/Payment/MercadoPagoButton';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { createPreference } from '../api/MPagoAPI';

const Ticket = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const { user } = useAuth()
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setPreferenceId(preferenceId.preferenceId);
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
        <h1 className="text-2xl font-bold mb-4">Tu Carrito</h1>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Tu Carrito</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="p-4 flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-2 py-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          {!preferenceId ? (
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
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