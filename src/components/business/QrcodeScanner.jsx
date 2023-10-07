import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState();
  const [scannerVisible, setScannerVisible] = useState(false);
  const scannerRef = useRef(null);
  useEffect(() => {
    if (scanResult) {
      window.location.href = scanResult;
    }
  }, [scanResult]);

  useEffect(() => {
    if (scannerVisible) {
      scannerRef.current = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scannerRef.current.render(success, error);

      return () => {
        scannerRef.current.clear();
      };
    }
  }, [scannerVisible]);

  function success(result) {
    setScanResult(result);
    setScannerVisible(false);
  }

  function error(err) {
    console.log(err);
  }

  function handleScanButtonClick() {
    setScanResult(null); // Reset scan result
    setScannerVisible(true);
  }

 
  return (
    <div>
      <h1>QR Code Scanning in React</h1>
      {scanResult ? (
        <div>
          Success: <a href={scanResult}>{scanResult}</a>
          
        </div>
      ) : (
        <div>
          {scannerVisible ? (
            <div>
              <div id="reader"></div>
            
            </div>
          ) : (
            <button onClick={handleScanButtonClick}>Scan QR Code</button>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
