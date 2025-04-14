import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";


export default function StaffLayout() {
  return (<>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-grow bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

      
      <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      />
    </>
  );
}
