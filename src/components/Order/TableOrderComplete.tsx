import { useQuery } from "@tanstack/react-query"
import { findAllOrder } from "../../api/TicketAPI"
import { ThemeContext } from "../../context/ThemeProvider"
import { clsx } from "clsx"
import Spinner from "../Spinner"
import { useContext } from "react"

export default function TableOrderComplete() {
    const { darkMode } = useContext(ThemeContext)
    const { data, isPending, error, status } = useQuery({
        queryKey: ['Order'],
        queryFn: findAllOrder,
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

    const completedOrders = data.filter(ticket => ticket.status === "Completed")

    return (
        <div className={clsx(
            "p-6 rounded-xl shadow-lg border",
            darkMode ? "bg-gray-800/80 border-gray-700 shadow-red-900/20" : "bg-gray-50 border-gray-200 shadow-blue-900/10"
        )}>
            <h2 className={clsx(
                "text-2xl font-bold mb-6",
                darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
            )}>
                Órdenes Completadas
            </h2>

            {completedOrders.length === 0 ? (
                <div className={clsx(
                    "text-center py-8 rounded-lg",
                    darkMode ? "bg-gray-700/50 text-gray-400" : "bg-white text-gray-500"
                )}>
                    No hay órdenes completadas
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className={clsx(
                                "text-sm uppercase tracking-wider",
                                darkMode ? "bg-gray-700/80 text-gray-300" : "bg-gray-200 text-gray-600"
                            )}>
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Cliente</th>
                                <th className="px-6 py-4 text-left">Productos</th>
                                <th className="px-6 py-4 text-center">Cantidad</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedOrders.map((ticket) => (
                                <tr 
                                    key={ticket.id} 
                                    className={clsx(
                                        "border-t text-sm",
                                        darkMode ? "border-gray-700 hover:bg-gray-700/60" : "border-gray-200 hover:bg-gray-100",
                                        "transition-colors duration-150"
                                    )}
                                >
                                    <td className="px-6 py-4">{ticket.id}</td>
                                    <td className="px-6 py-4 font-medium">
                                        {ticket.user.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            {ticket.items.map((item, i) => (
                                                <div 
                                                    key={i}
                                                    className={clsx(
                                                        "px-2 py-1 rounded",
                                                        darkMode ? "bg-gray-700" : "bg-gray-100"
                                                    )}
                                                >
                                                    {item.product.name}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="space-y-1">
                                            {ticket.items.map((item, i) => (
                                                <div 
                                                    key={i}
                                                    className={clsx(
                                                        "px-2 py-1 rounded mx-auto w-10",
                                                        darkMode ? "bg-gray-700" : "bg-gray-100"
                                                    )}
                                                >
                                                    {item.quantity}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-xs font-semibold",
                                            "bg-green-100 text-green-800"
                                        )}>
                                            Completado
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}