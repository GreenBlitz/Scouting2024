import express from "express";
import ViteExpress from "vite-express";

const app = express();

const server = app.listen(5173, "192.168.1.126", () =>
    console.log("Server is listening...")
  );
  
  ViteExpress.bind(app, server);