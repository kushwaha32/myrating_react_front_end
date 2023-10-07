import React, { useRef } from 'react';
import QRCode from 'qrcode';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

const QRCodeShare = ({ data }) => {
  const qrCodeRef = useRef(null);

  const shareQRCode = () => {
    const canvas = qrCodeRef.current;

    if (navigator.share && canvas) {
      canvas.toBlob(async (blob) => {
        await navigator.share({
          files: [new File([blob], 'qrcode.png', { type: 'image/png' })],
        });
      });
    }
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current;

    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qrcode.png';
      link.click();
    }
  };

  React.useEffect(() => {
    if (qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, data, { errorCorrectionLevel: 'H' });
    }
  }, [data]);

  return (
    <div>
      <canvas ref={qrCodeRef} className='mt-2' />

      <div>
        {/* <FacebookShareButton url={data} quote="Check out my QR code">
          Share on Facebook
        </FacebookShareButton>
        <TwitterShareButton url={data} title="Check out my QR code">
          Share on Twitter
        </TwitterShareButton> */}
      </div>
      <div className="qrcode-b">
      <button className="qrcode-bb qrcode-ba" onClick={shareQRCode}>Share QR Code</button>
      <button className=" qrcode-bb" onClick={downloadQRCode}>Download QR Code</button>
      </div>
    </div>
  );
};

export default QRCodeShare;

