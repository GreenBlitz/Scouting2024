import { defineConfig } from "vite";
import { sslOptions } from "./server";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "192.168.68.63", // Specify the IP address you want to use
    port: 5173, // You can change this to another port if necessary
    hmr: {
      protocol: "wss", // Use WebSocket Secure if you're serving over HTTPS
      port: 5173, // Ensure the same port is used for HMR
    },
    // https: sslOptions,
  },
});
