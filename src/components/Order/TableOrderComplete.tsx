import { useQuery } from "@tanstack/react-query"
import { findAllOrder } from "../../api/TicketAPI"

export default function TableOrderComplete() {
    const {data, isPending, error, status} = useQuery({
        queryKey:['Order'],
        queryFn: findAllOrder,
        retry: true
    })

    if(isPending){
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ordenes Completadas</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Cliente</th>
              <th className="px-4 py-2 border-b">Producto/s</th>
              <th className="px-4 py-2 border-b">Cantidad/es</th>
              <th className="px-4 py-2 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>
          {data.map((ticket) => (
                (ticket.status === "Completed" && (<tr key={ticket.id} className="text-center border-t">
                    <td className="px-4 py-2">{ticket.id}</td>
                    <td className="px-4 py-2">{ticket.user.name}</td>
                    <td className="px-4 py-2">
                      {ticket.items.map((item, i) => (
                        <div key={i}>{item.product.name}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      {ticket.items.map((item, i) => (
                        <div key={i}>{item.quantity}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2">Completado</td>
                  </tr>))
              ))}
          </tbody>
        </table>
      </div>
    )
}
