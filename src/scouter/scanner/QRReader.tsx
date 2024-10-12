import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles
import "./QRStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";

const QRReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [qrOn, setQrOn] = useState<boolean>(false);
  


  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {

   

    console.log(result);

    const DecodedData = btoa(result.data)
    console.log("AFTER" + DecodedData)
    console.log("LAST" + JSON.parse(DecodedData))

    navigate("/", { state: JSON.parse(DecodedData)  });
    




  };

  // Fail
  const onScanFail = (err: string | Error) => {
    console.log("I FUCKING FAILED")
    console.log(err);
  };

  // Request camera access
  const requestCameraAccess = async () => {
    try {
      // Request camera permission from the user
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // If permission is granted, set video element to stream
      if (videoEl?.current) {
        videoEl.current.srcObject = stream;
      }
      // Set QR scanner after getting camera stream
      initializeScanner();
    } catch (error) {
      // If permission is denied, show an alert
      alert("Camera access denied. Please allow access to scan QR codes.");
      setQrOn(false);
    }
  };

  // Initialize QR Scanner
  const initializeScanner = () => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      // Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }
  };

  // On component mount, request camera access
  useEffect(() => {
    requestCameraAccess();

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // Handle no camera access state sdfdsfs
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
   console.log("Finished, a")
  );
};

export default QRReader;
