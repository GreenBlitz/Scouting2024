import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

type QRCodeGeneratorProps = {
  text: string; // The text to encode in the QR code
};

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ text }) => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(text);
        setQrCodeData(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
        setQrCodeData(null);
      }
    };

    generateQRCode();
  }, [text]);

  return (
    <>{qrCodeData}</> // Return the Base64 string or null
  );
};

export default QRCodeGenerator;
