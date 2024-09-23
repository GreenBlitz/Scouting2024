import express, {Request, Response} from "express";
import ViteExpress from "vite-express";

const app = express();

const hostName = "192.168.1.126"
const port = 5173

app.use(express.json())

let matches: Record<string,string>[] = [];

app.post("/SubmitMatch",(req:Request, res:Response) => {
    matches.push(req.body)
    res.status(200).send("Sent");
})

app.delete("/Matches", (req: Request, res: Response) => {
    matches = []
    res.status(200).send("Deleted")
})

app.get("/Matches", (req: Request, res: Response) => {
    res.status(200).send(matches);
})

const server = app.listen(port, hostName, () =>
    console.log("Server is listening...")
  );
  

 ViteExpress.bind(app, server);