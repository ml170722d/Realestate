import express from "express";
import Authenticator from "../util/auth";

export default class FileController {
  async assess(req: express.Request, res: express.Response) {
    if (req.body.success) return res.sendStatus(200);
    return res.sendStatus(500);
  }
}
