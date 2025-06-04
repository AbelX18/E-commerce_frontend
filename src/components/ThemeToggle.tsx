import { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeProvider';

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <button
        onClick={toggleTheme}
        className={`relative w-14 h-8 rounded-full flex items-center px-4 transition-colors duration-300 ${
            darkMode ? 'bg-red-600' : 'bg-gray-50'
        }`}
        >
        <div
            className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            darkMode ? 'translate-x-7' : ''
            }`}
        />
        <span className="absolute left-2 text-yellow-400 text-sm">
            <Sun className="w-4 h-4" />
        </span>
        <span className="absolute right-1 text-blue-500 text-sm">
            <Moon className="w-4 h-4" />
        </span>
        </button>
    );
};

export default ThemeToggle;
