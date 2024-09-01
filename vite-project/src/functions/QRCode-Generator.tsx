import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface Props {
  text: string;
};

function QRCodeGenerator({text}: Props) {
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
    <img src={qrCodeData + ""} alt="QR code" />
  );
}

export default QRCodeGenerator;
