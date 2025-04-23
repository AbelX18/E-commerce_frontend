import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import { login as loginApi, logout as logoutApi, profileUser } from '../api/AuthAPI';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userName: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('AUTH_TOKEN');
        if (storedToken) {
            profileUser()
                .then(user => {
                    setUser(user);
                })
                .catch(() => {
                    localStorage.removeItem('AUTH_TOKEN');
                    setUser(null);
                });
        } else {
            setUser(null);
        }
        setLoading(false); 
    }, []);
    

    const login = async (userName: string, password: string) => {
        try {
            await loginApi({ userName, password });
            const userData = await profileUser()
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            isAuthenticated: !!user,
            login,
            logout,
            loading,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 