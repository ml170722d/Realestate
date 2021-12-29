import express from "express";
import dotenv from "dotenv";
import Logger from "js-logger";
import DB from "./db/DB";

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

const port = 8000;

app.use("/", router);
const server = app.listen(port, async () => {
  try {
    Logger.info(`Express has started working on http://localhost:${port}`);
    const db = await DB.getInstance();
  } catch (error) {
    Logger.error(`${error}`);
  }
});
