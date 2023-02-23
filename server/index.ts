import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./src/config/database";

import authRouters from "./src/routers/auth.routers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const databaseUrl: string = process.env.DATABASE_URL as string;

connectDatabase(databaseUrl);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/auth", authRouters);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
