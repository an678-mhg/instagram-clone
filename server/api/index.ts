// apps
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "../src/config/database";
// routers
import authRouters from "../src/routers/auth.routers";
import postsRouters from "../src/routers/posts.routers";
import likeRouters from "../src/routers/likes.routers";
import followRouters from "../src/routers/follow.routers";
import usersRouters from "../src/routers/users.routers";
import notificationsRouters from "../src/routers/notifications.routers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const databaseUrl: string = process.env.DATABASE_URL as string;

connectDatabase(databaseUrl);

app.use(cors({ origin: process.env.FRONT_END_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/auth", authRouters);
app.use("/api/posts", postsRouters);
app.use("/api/reaction", likeRouters);
app.use("/api/follow", followRouters);
app.use("/api/users", usersRouters);
app.use("/api/notifications", notificationsRouters);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
