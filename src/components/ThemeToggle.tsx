import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() =>
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
        onClick={() => setDarkMode(!darkMode)}
        className={`relative w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${
            darkMode ? 'bg-red-600' : 'bg-gray-300'
        }`}
        >
        <div
            className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            darkMode ? 'translate-x-6' : ''
            }`}
        />
        <span className="absolute left-1 text-yellow-400 text-sm">
            <Sun className="w-4 h-4" />
        </span>
        <span className="absolute right-1 text-white text-sm">
            <Moon className="w-4 h-4" />
        </span>
        </button>
    );
};

export default ThemeToggle;
