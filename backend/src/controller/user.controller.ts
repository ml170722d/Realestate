import { Request, Response } from "express";
import Logger from "js-logger";
import IResponce from "../interface/responce.interface";
import IUser from "../interface/user.interface";
import userSchema from "../shema/user.schema";

export default class UserContorller {
  async login(req: Request, res: Response<IResponce>) {
    try {
      const data: IUser = req.body;

      const query: IUser = {
        username: data.username,
        password: data.password,
        access: true,
      };

      const result = await userSchema.findOne(query);

      if (result) return res.status(200).json({ body: result });
      return res.status(401).json({ msg: "Invalid credentials" });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async logout(req: Request, res: Response<IResponce>) {
    const { id } = req.body;
    return res.status(200).json({});
  }

  async add(req: Request, res: Response<IResponce>) {
    try {
      const data: IUser = req.body;

      const query: IUser = {
        username: data.username,
        password: data.password,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        city: data.city,
        birthday: data.birthday,
        type: data.type,
      };

      const result = await userSchema.insertMany(query);

      return res
        .status(202)
        .json({ msg: "Please wait until your submition is reviewed" });
    } catch (error) {
      Logger.error(error);
    }
    return res.status(400).json({});
  }

  async get(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.query;

      let promise;
      if (id) {
        promise = userSchema.findById(id);
      } else {
        promise = userSchema.find();
      }

      const result: IUser = await promise;

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async delete(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.params;

      const result = await userSchema.findByIdAndDelete(id);

      return res.status(200).json({});
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async update(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.body;
      const data: IUser = req.body;

      const query: IUser = {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        city: data.city,
        birthday: data.birthday,
        agency: data.agency,
        licence: data.licence,
        favorite: data.favorite,
      };

      const result = await userSchema.findByIdAndUpdate(id, query, {
        runValidators: true,
        new: true,
      });

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async changePass(req: Request, res: Response<IResponce>) {
    try {
      const data: IUser = req.body;
      const update: IUser = { password: data.password };

      const result = await userSchema.findByIdAndUpdate(data.id, update, {
        runValidators: true,
        new: true,
      });

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }
}
