import express from "express";
import Logger from "js-logger";
import IResponce from "../interface/responce.interface";
import IUser from "../interface/user.interface";
import User from "../models/user";

export default class UserController {
  async login(req: express.Request, res: express.Response<IResponce>) {
    const { username, password } = req.body;
    const query: IUser = { username: username, password: password };
    const filter: IUser = { password: 0 };
    const user: IUser = await User.findOne(query, filter);

    try {
      if (user) return res.status(200).json({ body: user });
      return res.status(401).json({ msg: "Invalid credentials" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(400).json({ msg: (<Error>error).message });
    }
  }

  async logout(req: express.Request, res: express.Response<IResponce>) {
    return res.status(200).json({});
  }

  async changePass(req: express.Request, res: express.Response<IResponce>) {
    const data: IUser = req.body;
    const { newpass } = req.body;

    const query: IUser = {
      username: data.username,
      password: data.password,
      id: data.id,
    };
    const update: IUser = {
      password: newpass,
    };

    try {
      const user: IUser = await User.findOneAndUpdate(query, update);

      if (user) return res.status(200).json({});
      return res.status(401).json({ msg: "Invalid credentials" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(400).json({ msg: (<Error>error).message });
    }
  }

  async register(req: express.Request, res: express.Response<IResponce>) {
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

    try {
      const user: IUser[] = await User.insertMany(query);
      if (user.length > 0)
        return res
          .status(202)
          .json({ msg: "Please wait until your submition is reviewed" });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(400).json({ msg: (<Error>error).message });
    }
  }
}
