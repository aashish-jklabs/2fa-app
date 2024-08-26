import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signup({ email, password });
            localStorage.setItem('token', data.token);
            navigate('/verify-otp'); 
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSignup}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;
