import React, { useState } from 'react';
import { verifyTotp } from '../api';
import { useNavigate } from 'react-router-dom';

const TotpVerification = () => {
  const [email, setEmail] = useState('');
  const [totp, setTotp] = useState('');
  const navigate = useNavigate();

  const handleVerifyTotp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verifyTotp({ email, token: totp });
      localStorage.setItem('jwtToken', data.jwtToken);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleVerifyTotp}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="text" value={totp} onChange={(e) => setTotp(e.target.value)} placeholder="TOTP Code" required />
      <button type="submit">Verify TOTP</button>
    </form>
  );
};

export default TotpVerification;
