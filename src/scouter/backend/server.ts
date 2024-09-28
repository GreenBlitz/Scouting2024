import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import { Db, MongoClient } from "mongodb";

const app = express();

const hostname = "0.0.0.0";
const port = 4590;

app.use(express.json());
const mongoURI = "mongodb://0.0.0.0:27017";

//

let db: Db;

MongoClient.connect(mongoURI)
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("admin");
  })
  .catch((error) => console.error(`cannot connect: \n${error}`));

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

ViteExpress.bind(app, server);
