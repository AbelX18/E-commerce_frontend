import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Main", path: "/staff/main" },
  { label: "Staff", path: "/staff/user" },
  { label: "Productos", path: "/staff/products" },
  { label: "Categorías", path: "/staff/categories" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-md border-r p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-10">Mi E-commerce</h1>
        
        <nav className="space-y-4">
            {navItems.map(({ label, path }) => (
                <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-indigo-100 ${
                    isActive ? "bg-indigo-200 text-indigo-900" : ""
                }`
                }
            >
                {label}
            </NavLink>
            ))}
        </nav>
        </aside>
  );
}