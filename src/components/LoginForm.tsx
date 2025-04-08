import React, { useState } from 'react';
import { authenticateUser } from '../api/AuthAPI';


const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authenticateUser({ userName, password });
      return response
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
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
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>


    </>
  );
};

export default LoginForm;