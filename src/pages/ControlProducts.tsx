import { useNavigate } from "react-router-dom";
import TableProducts from "../components/Product/TableProducts";
import AddProductModal from "../components/Product/AddProductModal";



export default function ControlProducts() {
    const navigate = useNavigate()
    
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Productos cargados</h1>
            <div className="flex justify-end">
              <button 
              className="bg-blue-600 text-white px-4 py-2  m-3 rounded-lg shadow-md hover:bg-blue-700"
              onClick={() => navigate(location.pathname + "?newProduct=true")}
              >  
              Agregar Producto
              </button>
            </div>
            <TableProducts />
            <AddProductModal />
          </div>
        </div>
      );
}
