import { createContext, useEffect, useState, ReactNode } from 'react'

export const ThemeContext = createContext({
    darkMode: false,
    toggleTheme: () => {},
    })

    export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme')
        return savedTheme === 'dark'
    })

    useEffect(() => {
        const root = document.documentElement
        if (darkMode) {
        root.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        } else {
        root.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    const toggleTheme = () => setDarkMode(prev => !prev)

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    )
}
