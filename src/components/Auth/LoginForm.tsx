import React, { useState } from 'react';
import { login } from '../../api/AuthAPI';


const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      console.log(userName,password)
      const response = await login({ userName, password });
      return response
    } catch (err) {
      setError('Email o contraseña inválidos. Intenta de nuevo. :' + err); //despue hay que borrar el +err
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <p>No tienes una cuenta? <a href="/register">Registrate aqui </a></p> 
      </div>


    </>
  );
};

export default LoginForm;