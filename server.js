import express from "express";
import ViteExpress from "vite-express";

const app = express();

//Robotica IP lmao 
const server = app.listen(5173, "0.0.0.0", () =>
    console.log("Server is listening...")
  );
  
  ViteExpress.bind(app, server);