import { useNavigate } from "react-router-dom"
import TableCategory from "../components/Category/TableCategory"
import AddCategoryModal from "../components/Category/AddCategoryModal"


export default function ControlCategories() {
  const navigate = useNavigate()
    return (
            <div className="p-6 bg-gray-100 min-h-screen">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">Categorias cargadas</h1>
                <div className="flex justify-end">
                  <button 
                  className="bg-blue-600 text-white px-4 py-2  m-3 rounded-lg shadow-md hover:bg-blue-700"
                  onClick={() => navigate(location.pathname + "?newCategory=true")}
                  >  
                  Agregar Categoria
                  </button>
                </div>
                <TableCategory />
                <AddCategoryModal />
              </div>
            </div>
  )
}
