import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import OtpVerification from './components/OtpVerification';
import Signup from './components/Signup';
import TotpSetup from './components/TotpSetup';
import TotpVerification from './components/TotpVerification';


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/totp-setup" element={<TotpSetup />} />
        <Route path="/verify-totp" element={<TotpVerification />} />
        {/* Add other routes here */}
      </Routes>
  );
};

export default App;