import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EditStaffModal from "./EditStaffModal";
import DeleteStaffModal from "./DeleteStaffModal";
import { Staff } from "../../schema";
import { findAllUsers } from "../../api/UserAPI";


export default function TableProducts() {
    const [modal, setModal] = useState<{
      type: "edit"| 'delete';
      staff: Staff;
    } | null>(null)

    const { isPending, data, error, status} = useQuery({
      queryKey:['Staff'],
      queryFn: findAllUsers,
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
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Nombre de Usuario</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
                (user.role !== "BUYER" && 
                (<tr key={user.id} className="border-t text-sm text-gray-700 hover:bg-gray-50">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.userName}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button 
                        className="text-indigo-600 hover:underline text-sm"
                        onClick={() => setModal({ type: "edit", staff: user })}
                      >Editar</button>
    
                      <button 
                        type="button"
                        onClick={()=> setModal({ type: "delete", staff: user})}>Promover a cliente</button>
                    </td>
                  </tr>)
            )

            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No hay miembros del Staff cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {modal?.type === "edit" && (
        <EditStaffModal
          staff={modal.staff}
          staffId={modal.staff.id}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.type === "delete" && (
        <DeleteStaffModal
          staff={modal.staff}
          staffId={modal.staff.id}
          onClose={() => setModal(null)}
        />)}
      </div>


  )
}
