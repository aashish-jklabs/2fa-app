import React, { useState, useEffect } from 'react';
import { generateTotp } from '../api';

const TotpSetup = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchTotpSecret = async () => {
      try {
        const { data } = await generateTotp();
        setQrCodeUrl(data.qrCodeUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotpSecret();
  }, []);

  return (
    <div>
      <h2>Set up your authenticator app</h2>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
      <p>Scan the QR code with your authenticator app and enter the code below.</p>
    </div>
  );
};

export default TotpSetup;
