import express from "express";
import Logger from "js-logger";
import IResponce from "../interface/responce.interface";
import IUser from "../interface/user.interface";
import User from "../models/user";
import UserController from "./user.controller";

export default class AdminController {
  private static ERROR_MSG = "Check server log for more information";

  async grantAccess(req: express.Request, res: express.Response<IResponce>) {
    const { id, username } = req.body;
    const query: IUser = {
      id: id,
      username: username,
    };
    const update: IUser = {
      access: true,
    };

    try {
      const result = await User.findOneAndUpdate(query, update);

      if (result) return res.status(200).json({});
      return res.status(400).json({
        msg: `User with username: ${username} (id: ${id}) was not found in databese`,
      });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(400).json({ msg: AdminController.ERROR_MSG });
    }
  }

  async denyAccess(req: express.Request, res: express.Response<IResponce>) {
    const { id, username } = req.body;
    const query: IUser = {
      id: id,
      username: username,
    };
    const update: IUser = {
      access: false,
    };

    try {
      const result = await User.findOneAndUpdate(query, update);

      if (result) return res.status(200).json({});
      return res.status(400).json({
        msg: `User with username: ${username} (id: ${id}) was not found in databese`,
      });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(400).json({ msg: AdminController.ERROR_MSG });
    }
  }

  async deleteUser(req: express.Request, res: express.Response<IResponce>) {
    const { id, username } = req.body;
    const query: IUser = {
      id: id,
      username: username,
    };

    try {
      const result = await User.findOneAndDelete(query);

      if (result) return res.status(200).json({});
      return res.status(400).json({
        msg: `User with username: ${username} (id: ${id}) was not found in databese`,
      });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(400).json({ msg: AdminController.ERROR_MSG });
    }
  }

  async addUser(req: express.Request, res: express.Response<IResponce>) {
    new UserController().register(req, res);
  }
}
