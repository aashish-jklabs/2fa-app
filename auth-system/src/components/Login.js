import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await login({ email, password });
          navigate('/verify-otp');
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
    );
}

export default Login;