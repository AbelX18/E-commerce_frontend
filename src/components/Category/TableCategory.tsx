import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "../../api/CategoryAPI"
import EditCategoryModal from "./EditCategoryModal"
import { useContext, useState } from "react"
import { Category } from "../../schema/categorySchema"
import { ThemeContext } from "../../context/ThemeProvider"
import { clsx } from "clsx"
import Spinner from "../Spinner"

export default function TableCategory() {
    const { darkMode } = useContext(ThemeContext);
    const [modal, setModal] = useState<{
      type: "edit"
      category: Category
    } | null>(null);

    const { isPending, data, error, status } = useQuery({
        queryKey: ['Categories'],
        queryFn: getAllCategories,
        retry: true
    });

    if (isPending) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spinner className={clsx("h-12 w-12")} />
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className={clsx(
                "rounded-xl p-6 text-center",
                darkMode ? "bg-gray-800/50 text-red-400" : "bg-white text-red-600"
            )}>
                Error: {error.message}
            </div>
        );
    }

    return (
        <>
            <div className={clsx(
                "rounded-2xl shadow-lg overflow-x-auto border",
                darkMode ? "bg-gray-800/80 border-gray-700 shadow-red-900/20" : "bg-white border-gray-200 shadow-blue-900/10"
            )}>
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className={clsx(
                            "text-sm uppercase tracking-wider",
                            darkMode ? "bg-gray-700/80 text-gray-300" : "bg-gray-100 text-gray-600"
                        )}>
                            <th className="px-6 py-4 text-left">ID</th>
                            <th className="px-6 py-4 text-left">Categoría</th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((category) => (
                            <tr 
                                key={category.id} 
                                className={clsx(
                                    "border-t text-sm hover:bg-opacity-80 transition-colors",
                                    darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-700/50" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                <td className="px-6 py-4">{category.id}</td>
                                <td className="px-6 py-4 font-medium">{category.name}</td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => setModal({type: "edit", category})}
                                        className={clsx(
                                            "px-4 py-2 rounded-lg font-medium transition-all",
                                            "hover:shadow-md hover:-translate-y-0.5",
                                            darkMode 
                                                ? "bg-gray-700 hover:bg-gray-600 text-red-400 hover:text-white"
                                                : "bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-900"
                                        )}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td 
                                    colSpan={3} 
                                    className={clsx(
                                        "text-center py-8",
                                        darkMode ? "text-gray-400" : "text-gray-500"
                                    )}
                                >
                                    No hay categorías cargadas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modal?.type === "edit" && (
                <EditCategoryModal 
                    id={modal.category.id}
                    category={modal.category.name}
                    onClose={() => setModal(null)}
                />
            )}
        </>
    );
}