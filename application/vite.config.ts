import { defineConfig } from "vite";
import { sslOptions } from "./server";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "192.168.1.126", // Specify the IP address you want to use
    port: 4590, // You can change this to another port if necessary
    hmr: {
      protocol: "wss", // Use WebSocket Secure if you're serving over HTTPS
      port: 4590, // Ensure the same port is used for HMR
    },
    // https: sslOptions,
  },
});
