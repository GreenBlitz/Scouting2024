import express, { Request, Response } from "express";
import { Db, MongoClient } from "mongodb";
import ViteExpress from "vite-express";
import fs from "fs";
import path from "path";
import https from "https";
import cors from "cors";

const app = express();
const hostname = "0.0.0.0";
const port = 4590;

const pathToDir = "c:\\Users\\User\\Documents\\Full Stack\\";
// SSL options for HTTPS
export let sslOptions;
try {
  sslOptions = {
    key: fs.readFileSync(path.resolve(pathToDir, "ssl-key.pem")), // Path to the key file
    cert: fs.readFileSync(path.resolve(pathToDir, "ssl.pem")), // Path to the certificate file
  };
} catch {
  sslOptions = { key: "", cert: "" };
}

app.use(express.json());
app.use(cors());

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

if (sslOptions.key !== "") {
  // Serve static files from the Vite build output (dist folder)
  app.use(express.static(path.resolve(pathToDir,"\\Scouting2024\\application\\", "dist")));
  // Serve the frontend for any route that isn't an API
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(pathToDir,"\\Scouting2024\\application\\", "dist", "index.html"));
  });
  // Create HTTPS server
  const httpsServer = https.createServer(sslOptions, app);

  // Start the HTTPS server
  httpsServer.listen(port, hostname, () => {
    console.log(`HTTPS Server is listening on https://${hostname}:${port}`);
  });
} else {
  const server = app.listen(port, hostname, () =>
    console.log(`Server is listening on ${hostname}:${port}`)
  );

  ViteExpress.bind(app, server);
}
