import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import background from '../assets/background.jpg'

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(userName, password);
            navigate('/');
        } catch (err) {
            setError('Usuario o contraseña incorrecta');
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage:`url(${background})`}}>
            <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md shadow-lg rounded-xl p-8 max-w-md w-full space-y-6 border border-white/20">
                <div>
                <h2 className="text-center text-3xl font-extrabold text-white drop-shadow-md">
                    Ingresa a tu cuenta
                </h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                    <label htmlFor="userName" className="sr-only">
                        UserName
                    </label>
                    <input
                        id="userName"
                        name="userName"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/20 placeholder-gray-500 dark:placeholder-white/50 text-gray-900 dark:text-white bg-white/10 focus:outline-none sm:text-sm"
                        placeholder="Nombre de Usuario"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/20 placeholder-gray-500 dark:placeholder-white/50 text-gray-900 dark:text-white bg-white/10 focus:outline-none sm:text-sm"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                <div>
                    <button
                    type="submit"
                    className="group btn-login"
                    >
                    Iniciar sesión
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
