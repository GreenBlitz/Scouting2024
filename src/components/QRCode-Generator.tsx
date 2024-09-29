import { useEffect, useState } from "react";
import QRCode from "qrcode";
import React from "react";

interface QRCodeGeneratorProps {
  text: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ text }) => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  useEffect(() => {

    const base64Text = atob(text);

    QRCode.toDataURL(base64Text)
      .then(setQrCodeData)
      .catch((err) => {
        console.error("Error generating QR code:", err);
        setQrCodeData(null);
      });
  }, [text]);

  return <img src={qrCodeData + ""} alt="QR code" />;
};

export default QRCodeGenerator;
