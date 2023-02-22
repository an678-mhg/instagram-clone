import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./src/config/database";
import cookieParser from "cookie-parser";

import authRouters from "./src/routers/auth.routers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const databaseUrl: string = process.env.DATABASE_URL as string;

console.log(process.env.MAIL_RF_TOKEN);

connectDatabase(databaseUrl);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/auth", authRouters);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
