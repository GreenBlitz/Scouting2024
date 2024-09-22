import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/testAPI",(req, res) => {
    res.status(200).send("Mr p");
})

const server = app.listen(5173, "0.0.0.0", () =>
    console.log("Server is listening...")
  );
  

 ViteExpress.bind(app, server);