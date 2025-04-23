import { getAllProducts } from "../../api/ProductAPI";
import { useQuery } from "@tanstack/react-query";
import EditProductModal from "./EditProductModal";
import { useState } from "react";
import { Product } from "../../schema/productSchema";
import DetailsProductModal from "./DetailsProductModal";
import DeleteProductModal from "./DeleteProductModal";

export default function TableProducts() {
    const [modal, setModal] = useState<{
      type: "edit" | "details" | 'delete'
      product: Product
    } | null>(null)

    const { isPending, data, error, status} = useQuery({
      queryKey:['products'],
      queryFn: () => getAllProducts(),
      retry: true
    })

    if (isPending) {
      return <span>Loading...</span>
    }

    if (status === 'error') {
      return <span>Error: {error.message}</span>
    }
  
    return (
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-justify text-sm text-gray-600 uppercase tracking-wider">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3 ">Cantidad</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((prod) => (
              <tr key={prod.id} className="border-t text-sm text-gray-700 hover:bg-gray-50">
                <td className="px-4 py-3">{prod.name}</td>
                <td className="px-4 py-3">{prod.category.name}</td>
                <td className="px-4 py-3">${prod.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">{prod.quantity}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button 
                    className="text-indigo-600 hover:underline text-sm"
                    onClick={() => setModal({ type: "edit", product: prod })}
                  >Editar</button>

                  <button 
                    type="button"
                    onClick={() => setModal({ type: "details", product: prod })}
                  >Ver info</button>
                  <button 
                    type="button"
                    onClick={()=> setModal({ type: "delete", product: prod})}>Eliminar</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No hay productos cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {modal?.type === "edit" && (
        <EditProductModal
          product={modal.product}
          productId={modal.product.id}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.type === "details" && (
        <DetailsProductModal
          product={modal.product}
          productId={modal.product.id}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.type === "delete" && (
        <DeleteProductModal
          product={modal.product}
          productId={modal.product.id}
          onClose={() => setModal(null)}
        />)}
      </div>


  )
}
