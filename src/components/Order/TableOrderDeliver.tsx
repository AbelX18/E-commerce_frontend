import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { completeOrder, findAllOrder } from "../../api/TicketAPI"
import { toast } from "react-toastify"


export default function TableOrderDeliver() {
    const { data, isPending, error, status} = useQuery({
        queryKey:['Order'],
        queryFn: findAllOrder,
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: completeOrder,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['Order']})
            toast.success("Orden Completada Correctamente!!")
        }
    })

    if(isPending){
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }
    

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Órdenes para preparar</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Cliente</th>
                <th className="px-4 py-2 border-b">Producto/s</th>
                <th className="px-4 py-2 border-b">Cantidad/es</th>
                <th className="px-4 py-2 border-b">Estado</th>
                <th className="px-4 py-2 border-b">Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ticket) => (
                (ticket.status === "Deliver" && (<tr key={ticket.id} className="text-center border-t">
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
                    <td className="px-4 py-2">En espera de retiro</td>
                    <td className="px-4 py-2">
                      <button 
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => mutate(ticket.id)}
                        >
                        Completar
                      </button>
                    </td>
                  </tr>))
              ))}
            </tbody>
          </table>
        </div>
      )
}
