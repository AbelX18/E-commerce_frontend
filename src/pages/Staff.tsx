import { getUsernameFromToken } from "../utils/jwt"


interface Staff {
  name: string
}

export default function Staff() {
  const staffName = getUsernameFromToken() || 'User'
  
  return (
    <>
    <h1 className="text-xl text-red-600">
      <b>
        Bienvenido {staffName}!!
      </b>
      
    </h1>
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Control - Staff</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card title="Staff" value={3} />
          <Card title="Productos" value={5} />
          <Card title="Categorías" value={6} />
          <Card title="Órdenes" value={8} />
        </div>

      </div>
    </div>
    <div className="flex flex-col gap-8">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ordenes para preparar</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Cliente</th>
              <th className="px-4 py-2 border-b">Producto</th>
              <th className="px-4 py-2 border-b">Cantidad</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ordenes Completadas</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Cliente</th>
              <th className="px-4 py-2 border-b">Producto</th>
              <th className="px-4 py-2 border-b">Cantidad</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
      <span className="text-2xl text-red-800">{title}</span>
      <span className="text-2xl font-bold text-indigo-600">{value}</span>
    </div>
  );
}
