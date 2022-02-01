import express from "express";
import Logger from "js-logger";
import mongoose from "mongoose";
import IPost from "../interface/post.interface";
import IResponce from "../interface/responce.interface";
import Post from "../models/post";

export default class PostController {
  async add(req: express.Request, res: express.Response<IResponce>) {
    const data: IPost = req.body;
    const query: IPost = {
      about: data.about,
      advertiser: data.advertiser,
      characteristics: data.characteristics,
      area: data.area,
      constructionYear: data.constructionYear,
      floor: data.floor,
      heating: data.heating,
      location: data.location,
      microlocation: data.microlocation,
      monthlyUtilities: data.monthlyUtilities,
      parking: data.parking,
      price: data.price,
      rooms: data.rooms,
      sold: data.sold,
      state: data.state,
      title: data.title,
      totalFloors: data.totalFloors,
      type: data.type,
    };
    try {
      const result = await Post.insertMany(query);

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }

  async update(req: express.Request, res: express.Response<IResponce>) {
    const data: IPost = req.body;
    const currTime = new Date();
    const update: IPost = {
      about: data.about,
      advertiser: data.advertiser,
      characteristics: data.characteristics,
      area: data.area,
      constructionYear: data.constructionYear,
      floor: data.floor,
      heating: data.heating,
      location: data.location,
      microlocation: data.microlocation,
      monthlyUtilities: data.monthlyUtilities,
      parking: data.parking,
      pics: data.pics,
      price: data.price,
      rooms: data.rooms,
      sold: data.sold,
      state: data.state,
      title: data.title,
      totalFloors: data.totalFloors,
      type: data.type,
      updated: currTime,
    };

    try {
      let result: IPost = await Post.findById(data.id);
      if (!result || !result.updated)
        throw new Error("Last post edit time is unknown");
      const updateDiff =
        currTime.getTime() - new Date(result.updated.toString()).getTime();

      if (updateDiff >= 1 * 60 * 60 * 1000) {
        result = await Post.findByIdAndUpdate(data.id, update, { new: true });

        if (result) return res.status(200).json({ body: result });
        return res.status(400).json({ msg: "Post not fount" });
      }

      return res
        .status(400)
        .json({ msg: "Post can be edited once every hour" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }

  async get(req: express.Request, res: express.Response<IResponce>) {
    const { id } = req.params;
    try {
      const result = await Post.findById(id);

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({ msg: "Could not find requested post" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }

  async all(req: express.Request, res: express.Response<IResponce>) {
    try {
      const result = await Post.find();

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }

  async markAsSold(req: express.Request, res: express.Response<IResponce>) {
    const { id } = req.body;
    const update: IPost = {
      sold: true,
    };

    try {
      const result = await Post.findByIdAndUpdate(id, update, { new: true });

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }

  async avragePricePerM2(
    req: express.Request,
    res: express.Response<IResponce>
  ) {
    const { id } = req.query;

    try {
      const result = await Post.aggregate([
        {
          $match: {
            location: new mongoose.Types.ObjectId(<string>id),
          },
        },
        {
          $group: {
            _id: "$location",
            priceSum: {
              $sum: "$price",
            },
            areaSum: {
              $sum: "$area",
            },
          },
        },
      ]);

      const { priceSum, areaSum } = result[0];
      Logger.debug(`priceSum: ${priceSum}, areaSum: ${areaSum}`);

      if (result)
        return res.status(200).json({
          body: {
            avg: priceSum / areaSum,
          },
        });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }

  async getLatest(req: express.Request, res: express.Response<IResponce>) {
    try {
      const { n } = req.query;
      const result = await Post.find()
        .sort({ published: "desc" })
        .limit(Number(n));
      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }
}
