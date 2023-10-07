

import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QRCodeScanner = () => {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (error) => {
    console.error('Error scanning QR code:', error);
  };

  return (
    <div>
      <QrReader delay={300} onError={handleError} onScan={handleScan} />

      {result && <p>Scanned QR code: {result}</p>}
    </div>
  );
};

export default QRCodeScanner;
