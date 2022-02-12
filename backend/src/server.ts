import express from "express";
import dotenv from "dotenv";
import Logger from "js-logger";
import cors from "cors";

import DB from "./util/DB";
import Host from "./util/host";
import { serverRouter } from "./router/server.router";
import { publicRouter } from "./router/public.router";

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

const port = process.env.PORT;

app.use(publicRouter);
app.use("/api", serverRouter);

const server = app.listen(port, async () => {
  try {
    Logger.info(`Express has started working on ${Host.getHostUrl()}`);
    const db = await DB.getInstance();
  } catch (error) {
    Logger.error(`${error}`);
  }
});
