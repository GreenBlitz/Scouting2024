import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import { Db, MongoClient } from "mongodb";
import fs from 'fs';
import path from 'path';
import https from 'https';  // Import HTTPS module

const app = express();
const hostname = "0.0.0.0";
const port = 4590;

// SSL options for HTTPS
const sslOptions = {
  key: fs.readFileSync(path.resolve('/home/aviv/Scouting2024/', 'ssl-key.pem')),   // Path to the key file
  cert: fs.readFileSync(path.resolve('/home/aviv/Scouting2024/', 'ssl.pem'))       // Path to the certificate file
};

app.use(express.json());

const mongoURI = "mongodb://0.0.0.0:27017";
let db: Db;

// Connect to MongoDB
MongoClient.connect(mongoURI)
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("admin");
  })
  .catch((error) => console.error(`Cannot connect: \n${error}`));

// Define routes
app.post("/Match", async (req: Request, res: Response) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  const matchCollection = db.collection("matches");

  try {
    const matchData = req.body;
    const result = await matchCollection.insertOne(matchData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to insert data" });
  }
});

app.get("/Matches", async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  const matchCollection = db.collection("matches");
  try {
    const items = await matchCollection.find().toArray();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create HTTPS server
const httpsServer = https.createServer(sslOptions, app);

// Start the HTTPS server
httpsServer.listen(port, hostname, () => {
  console.log(`HTTPS Server is listening on https://${hostname}:${port}`);
});

// Bind ViteExpress to the HTTPS server
ViteExpress.bind(app, httpsServer);
