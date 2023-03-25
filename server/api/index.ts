// apps
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "../src/config/database";
// routers
import authRouters from "../src/routers/auth.routers";
import postsRouters from "../src/routers/posts.routers";
import likeRouters from "../src/routers/likes.routers";
import commentRouters from "../src/routers/comments.routers";
import followRouters from "../src/routers/follow.routers";

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
app.use("/api/posts", postsRouters);
app.use("/api/reaction", likeRouters);
app.use("/api/comment", commentRouters);
app.use("/api/follow", followRouters);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});