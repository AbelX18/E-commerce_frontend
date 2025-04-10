import { useEffect, useState } from "react";
import { Product } from "../../schema/productSchema";
import { getAllProducts } from "../../api/ProductAPI";


export default function TableProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts()
                console.log(response)
                 if (response) {
                    setProducts(response.map((item: Product) => ({
                        id: item.id,
                        name: item.name,
                        categoryId: item.categoryId,
                        category: { name: item.category.name },
                        quantity: item.quantity,
                        price: item.price,
                        image: item.image || "",
                        description: item.description || "",
                    })));
                 }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);


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
            {products.map((prod) => (
              <tr key={prod.id} className="border-t text-sm text-gray-700 hover:bg-gray-50">
                <td className="px-4 py-3">{prod.name}</td>
                <td className="px-4 py-3">{prod.category.name}</td>
                <td className="px-4 py-3">${prod.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">{prod.quantity}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button className="text-indigo-600 hover:underline text-sm">Editar</button>
                  <button type="button">Ver info</button>
                  <button type="button">Eliminar</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No hay productos cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  )
}
