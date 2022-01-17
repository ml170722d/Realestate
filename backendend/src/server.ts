import express from "express";
import dotenv from "dotenv";
import Logger from "js-logger";
import DB from "./util/DB";
import Host from "./util/host";
import { userRouter } from "./routers/user.router";
import { fileRouter, publicRouter } from "./routers/file.router";

dotenv.config();
Logger.useDefaults({
  defaultLevel: Logger.INFO,
  formatter: function (messages, context) {
    messages.unshift(new Date().toUTCString() + " > ");
  },
});

const app = express();
app.use(express.json());

const router = express.Router();
router.use(userRouter);
router.use(fileRouter);

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
