import { useEffect, useState } from "react";
import QRCode from "qrcode";
import React from "react";
import * as serde from "../Serde";
import {encode} from "uint8-to-base64";

interface QRCodeGeneratorProps {
  text: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ text }) => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  console.log("raw data:");
  console.log(JSON.parse(text));
  let serialized=serde.serdeRecord(serde.qrSerde).serializer(JSON.parse(text));
  console.log(serialized);

  useEffect(() => {
    QRCode.toDataURL(encode(serialized))
      .then(setQrCodeData)
      .catch((err) => {
        console.error("Error generating QR code:", err);
        setQrCodeData(null);
      });
  }, [text]);

  return <img src={qrCodeData + ""} alt="QR code" />;
};

export default QRCodeGenerator;
