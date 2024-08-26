import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000/api/auth' });

export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const verifyOtp = (data) => API.post('/verify-otp', data);
export const googleAuth = (data) => API.post('/google-auth', data);
export const generateTotp = () => API.post('/generate-totp', {}, { headers: { Authorization: localStorage.getItem('token') } });
export const verifyTotp = (data) => API.post('/verify-totp', data);