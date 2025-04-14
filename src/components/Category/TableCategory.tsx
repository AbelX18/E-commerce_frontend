import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "../../api/CategoryAPI"
import EditCategoryModal from "./EditCategoryModal"
import { useState } from "react"
import { Category } from "../../schema/categorySchema"

export default function TableCategory() {
    const [modal, setModal] = useState<{
      type: "edit"
      category: Category
    }| null >(null)
    const {isPending, data, error, status} = useQuery({
        queryKey:['Categories'],
        queryFn: getAllCategories
    })

    if(isPending){
      return <span>Loading...</span>
    }
    if(status === "error"){
      return <span>Error: {error.message}</span>
    }

    return (
      <>
      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-justify text-sm text-gray-600 uppercase tracking-wider">
            <th className="px-4 py-3">Id</th>
            <th className="px-4 py-3">Categoria</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category) => (<tr key={category.id} className="border-t text-sm text-gray-700 hover:bg-gray-50">
                  <td className="px-4 py-3">{category.id}</td>
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button 
                      className="text-indigo-600 hover:underline text-sm"
                      onClick={() => setModal({type:"edit", category})}
                    >Editar</button>
  
                    
                  </td>
                </tr>)
          )}
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No hay Categorias cargadas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      {modal?.type === "edit" && (
        <EditCategoryModal 
        id= {modal.category.id}
        category={modal.category.name}
        onClose={() => setModal(null)}
        />
      )}

  </>
  )
}
