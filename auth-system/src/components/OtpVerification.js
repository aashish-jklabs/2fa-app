import React, { useState } from 'react';
import { verifyOtp } from '../api';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
  
    const handleVerifyOtp = async (e) => {
      e.preventDefault();
      try {
        const { data } = await verifyOtp({ email, otp });
        localStorage.setItem('token', data.token);
        navigate('/totp-setup');
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <form onSubmit={handleVerifyOtp}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" required />
        <button type="submit">Verify OTP</button>
      </form>
    );
};
  
export default OtpVerification;