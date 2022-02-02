import express from "express";
import Logger from "js-logger";
import IPost from "../interface/post.interface";
import IResponce from "../interface/responce.interface";
import IUser from "../interface/user.interface";
import User from "../models/user";
import Post from "../models/post";

export default class AdvertiserController {
  async updateProfile(req: express.Request, res: express.Response<IResponce>) {
    const data: IUser = req.body;
    const update: IUser = {
      phone: data.phone,
      email: data.email,
      agency: data.agency,
      licence: data.licence,
    };

    try {
      const result = await User.findByIdAndUpdate(data.id, update, {
        new: true,
      });

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({ msg: "User was not found" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }

  async getByAdvertiser(
    req: express.Request,
    res: express.Response<IResponce>
  ) {
    const { adv } = req.query;
    const query: IPost = {
      advertiser: String(adv),
    };
    const filter: IPost = {
      price: 1,
      id: 1,
      title: 1,
      type: 1,
    };

    try {
      const result = await Post.find(query, filter);

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }
}
