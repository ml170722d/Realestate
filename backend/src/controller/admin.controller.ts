import { Request, Response } from "express";
import Logger from "js-logger";
import IResponce from "../interface/responce.interface";
import IUser from "../interface/user.interface";
import userSchema from "../shema/user.schema";

export default class AdminController {
  async grant(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.body;
      const update: IUser = {
        access: true,
      };

      const result = await userSchema.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true,
      });

      return res.status(200).json({});
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async deny(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.body;
      const update: IUser = {
        access: false,
      };

      const result = await userSchema.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true,
      });

      return res.status(200).json({});
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }
}
