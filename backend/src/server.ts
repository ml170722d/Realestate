import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Logger from "js-logger";
import DB from "./util/DB";
import Host from "./util/host";
import { userRouter } from "./routers/user.router";
import { fileRouter, publicRouter } from "./routers/file.router";
import { adminRouter } from "./routers/admin.router";
import { postRouter } from "./routers/post.router";
import { advertiserRouter } from "./routers/advertiser.router";

dotenv.config();
Logger.useDefaults({
  defaultLevel: Logger.INFO,
  formatter: function (messages, context) {
    messages.unshift(new Date().toUTCString() + " > ");
  },
});

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();
router.use(userRouter);
router.use(fileRouter);
router.use(adminRouter);
router.use(postRouter);
router.use(advertiserRouter);

const port = process.env.PORT;

app.use("/api", router);
app.use(publicRouter);
const server = app.listen(port, async () => {
  try {
    Logger.info(`Express has started working on ${Host.getHostUrl()}`);
    const db = await DB.getInstance();
  } catch (error) {
    Logger.error(`${error}`);
  }
});
