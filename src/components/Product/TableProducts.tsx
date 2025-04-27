import { getAllProducts } from "../../api/ProductAPI";
import { useQuery } from "@tanstack/react-query";
import EditProductModal from "./EditProductModal";
import { useState, useContext } from "react";
import { Product } from "../../schema/productSchema";
import DetailsProductModal from "./DetailsProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { clsx } from "clsx";
import { ThemeContext } from "../../context/ThemeProvider";
import Spinner from "../Spinner";

export default function TableProducts() {
    const { darkMode } = useContext(ThemeContext);
    const [modal, setModal] = useState<{
      type: "edit" | "details" | 'delete'
      product: Product
    } | null>(null)

    const { isPending, data, error, status } = useQuery({
      queryKey: ['products'],
      queryFn: () => getAllProducts(),
      retry: true
    })

    if (isPending) {
      return (
        <div className="flex justify-center items-center py-12">
          <Spinner className={clsx(
            "h-12 w-12",
            darkMode ? "text-red-500" : "text-blue-500"
          )} />
        </div>
      )
    }

    if (status === 'error') {
      return (
        <div className={clsx(
          "rounded-xl p-6 text-center",
          darkMode ? "bg-gray-800/50 text-red-400" : "bg-white text-red-600"
        )}>
          Error: {error.message}
        </div>
      )
    }
  
    return (
        <div className={clsx(
          "rounded-2xl shadow-lg p-4 md:p-6 overflow-x-auto border",
          darkMode 
            ? "bg-gray-800/80 border-gray-700 shadow-red-900/20" 
            : "bg-white border-gray-200 shadow-blue-900/10"
        )}>
          <h2 className={clsx(
            "text-2xl font-bold mb-6",
            darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
          )}>
            Listado de Productos
          </h2>
          
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className={clsx(
                "text-sm uppercase tracking-wider",
                darkMode ? "bg-gray-700/80 text-gray-300" : "bg-gray-200 text-gray-600"
              )}>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-left">Precio</th>
                <th className="px-4 py-3 text-center">Cantidad</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((prod) => (
                <tr 
                  key={prod.id} 
                  className={clsx(
                    "border-t text-sm transition-colors duration-150",
                    darkMode 
                      ? "border-gray-700 hover:bg-gray-700/60 text-gray-300" 
                      : "border-gray-200 hover:bg-gray-100 text-gray-700"
                  )}
                >
                  <td className="px-4 py-3 font-medium">{prod.name}</td>
                  <td className="px-4 py-3">{prod.category.name}</td>
                  <td className="px-4 py-3">${prod.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">{prod.quantity}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-3">
                      <button 
                        className={clsx(
                          "px-3 py-1 rounded-md text-sm font-medium transition-all",
                          "hover:shadow-md hover:-translate-y-0.5",
                          darkMode 
                            ? "text-blue-400 hover:bg-blue-900/30 hover:text-blue-300" 
                            : "text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                        )}
                        onClick={() => setModal({ type: "edit", product: prod })}
                      >
                        Editar
                      </button>

                      <button 
                        className={clsx(
                          "px-3 py-1 rounded-md text-sm font-medium transition-all",
                          "hover:shadow-md hover:-translate-y-0.5",
                          darkMode 
                            ? "text-green-400 hover:bg-green-900/30 hover:text-green-300" 
                            : "text-green-600 hover:bg-green-100 hover:text-green-800"
                        )}
                        onClick={() => setModal({ type: "details", product: prod })}
                      >
                        Detalles
                      </button>

                      <button 
                        className={clsx(
                          "px-3 py-1 rounded-md text-sm font-medium transition-all",
                          "hover:shadow-md hover:-translate-y-0.5",
                          darkMode 
                            ? "text-red-400 hover:bg-red-900/30 hover:text-red-300" 
                            : "text-red-600 hover:bg-red-100 hover:text-red-800"
                        )}
                        onClick={() => setModal({ type: "delete", product: prod })}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className={clsx(
                    "text-center py-8 text-lg",
                    darkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    No hay productos cargados
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
            />
          )}
        </div>
    )
}