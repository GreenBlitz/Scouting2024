import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QrReader from './QR-scanner/QrReader'

function App() {
  // State to track the counter
  const [count, setCount] = useState(0);

  // New state to track whether the form is submitted (or when to show the QR scanner)
  const [showQRScanner, setShowQRScanner] = useState(false);

  // Function to handle submit button click
  const handleSubmit = () => {
    setShowQRScanner(true); // Change state to show QR scanner
  };

  return (
    <>
      {/* Conditionally render the QR Scanner or the normal content */}
      {showQRScanner ? (
        // QR Scanner view when state is true
        <QrReader />
      ) : (
        // Original content when state is false
        <>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">SKRRRRRRRRRRRRRRRRR</p>

          {/* Add submit button that changes state to show QR scanner */}
          <button onClick={handleSubmit}>
            Submit and Scan QR
          </button>
        </>
      )}
    </>
  );
}

export default App;
