import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { clsx } from "clsx";
import { useContext } from "react";

const navItems = [
  { label: "Main", path: "/staff/main" },
  { label: "Staff", path: "/staff/user" },
  { label: "Productos", path: "/staff/products" },
  { label: "Categorías", path: "/staff/categories" },
];

export default function Sidebar() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <aside className={clsx(
      "w-64 min-h-screen fixed border-r p-6 transition-colors duration-300",
      "shadow-lg z-10",
      darkMode 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-200"
    )}>
      <h1 className={clsx(
        "text-2xl font-bold mb-10",
        darkMode ? "text-arkadia-gradient-dark" : "text-arkadia-gradient"
      )}>
        Panel Staff
      </h1>
      
      <nav className="space-y-3">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => clsx(
              "block px-4 py-3 rounded-lg font-medium transition-all duration-200",
              "hover:shadow-md hover:-translate-x-1",
              darkMode
                ? isActive
                  ? "bg-red-900/50 text-white shadow-red-900/30 border-l-4 border-red-500"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                : isActive
                  ? "bg-blue-100 text-blue-800 shadow-blue-900/20 border-l-4 border-blue-500"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            )}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className={clsx(
        "absolute bottom-6 left-6 right-6 pt-4 border-t",
        darkMode ? "border-gray-700" : "border-gray-200"
      )}>
        <p className={clsx(
          "text-sm",
          darkMode ? "text-gray-400" : "text-gray-500"
        )}>
          Arkadia E-commerce
        </p>
      </div>
    </aside>
  );
}