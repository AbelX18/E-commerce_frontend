import { useEffect, useState } from "react";
import { cantCategory } from "../api/CategoryAPI"
import { getUsernameFromToken } from "../utils/jwt"
import { cantStaff } from "../api/UserAPI";
import { cantProduct } from "../api/ProductAPI";
import { cantOrder } from "../api/TicketAPI";
import TableOrderDeliver from "../components/Order/TableOrderDeliver";
import TableOrderComplete from "../components/Order/TableOrderComplete";

interface Staff {
  name: string
}

export default function Staff() {
  const staffName = getUsernameFromToken() || 'User'
  const [cantCategories, setCantCategories] = useState<number>(0);
  const [cantStaffs, setCantStaffs] = useState<number>(0);
  const [cantOrders, setCantOrders] = useState<number>(0);
  const [cantOrdersComplete, setCantOrderComplete] = useState<number>(0);
  const [cantProducts, setCantProducts] = useState<number>(0);

  useEffect(() => {
    cantCategory().then(setCantCategories).catch(() => setCantCategories(0));
    cantStaff().then(setCantStaffs).catch(() => setCantStaffs(0) );
    cantProduct().then(setCantProducts).catch(() => setCantProducts(0));
    cantOrder("Pending").then(setCantOrders).catch(() => setCantOrders(0))
    cantOrder("Complete").then(setCantOrderComplete).catch(() => setCantOrderComplete(0))
  }, []);

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
          <Card title="Staff" value={cantStaffs} />
          <Card title="Productos" value={cantProducts} />
          <Card title="Categorías" value={cantCategories} />
          <Card title="Órdenes para Retirar" value={cantOrders} />
          <Card title="Órdenes Completas" value={cantOrdersComplete} />
        </div>

      </div>
    </div>
    <div className="flex flex-col gap-8">
      <TableOrderDeliver/>
      <TableOrderComplete/>
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
