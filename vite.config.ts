import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '192.168.1.99',  // Specify the IP address you want to use
    port: 4590,  // You can change this to another port if necessary
    hmr: {
      protocol: 'wss',  // Use WebSocket Secure if you're serving over HTTPS
      port: 4590,       // Ensure the same port is used for HMR
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl-key.pem')),  // Path to your private key
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl.pem')),  // Path to your SSL certificate
    },
  },
});
