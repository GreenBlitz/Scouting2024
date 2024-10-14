import express, { Request, Response } from "express";
import { Db, MongoClient } from "mongodb";
<<<<<<<< HEAD:server.ts
import fs from 'fs';
import path from 'path';
import https from 'https';
========
import ViteExpress from "vite-express";
import cors from "cors";
>>>>>>>> scouter:application/src/scouter/backend/server.ts

const app = express();
const hostname = "0.0.0.0";
const port = 4590;

// SSL options for HTTPS
const sslOptions = {
  key: fs.readFileSync(path.resolve('/home/aviv/Scouting2024/', 'ssl-key.pem')),   // Path to the key file
  cert: fs.readFileSync(path.resolve('/home/aviv/Scouting2024/', 'ssl.pem'))       // Path to the certificate file
};

// Serve static files from the Vite build output (dist folder)
app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(express.json());
<<<<<<<< HEAD:server.ts

const mongoURI = "mongodb://0.0.0.0:27017";
========
app.use(cors());
const mongoURI = "mongodb://mongo:27017";

>>>>>>>> scouter:application/src/scouter/backend/server.ts
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

//REMEMBER TO ADD AUTHENTICATION BEFORE DEPLOYMENT IN COMPETITION
app.delete("/Matches", async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  const matchCollection = db.collection("matches");
  try {
    const items = await matchCollection.deleteMany();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error);
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

<<<<<<<< HEAD:server.ts
// Serve the frontend for any route that isn't an API
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
========
app.get("/Matches/:type/:value", async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  const matchCollection = db.collection("matches");
  try {
    const items = (await matchCollection.find().toArray()).filter((item) => {
      if (req.params.type) {
        return item[req.params.type] === req.params.value;
      }
      return true;
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

const server = app.listen(port, hostname, () =>
  console.log(`Server is listening on ${hostname}:${port}`)
);
>>>>>>>> scouter:application/src/scouter/backend/server.ts

// Create HTTPS server
const httpsServer = https.createServer(sslOptions, app);

// Start the HTTPS server
httpsServer.listen(port, hostname, () => {
  console.log(`HTTPS Server is listening on https://${hostname}:${port}`);
});
