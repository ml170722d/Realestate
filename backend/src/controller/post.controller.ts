import { Request, Response } from "express";
import Logger from "js-logger";
import IPost, { IPostFilter } from "../interface/post.interface";
import IResponce from "../interface/responce.interface";
import postSchema from "../shema/post.schema";
import mongoose from "mongoose";

export default class PostController {
  async get(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.query;

      let promise;
      if (id) {
        promise = postSchema.findById(id);
      } else {
        promise = postSchema.find();
      }

      const result = await promise.populate("advertiser").populate("location");

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async latest(req: Request, res: Response<IResponce>) {
    try {
      const { n } = req.query;

      const result = await postSchema
        .find()
        .sort({ published: "desc" })
        .limit(Number(n))
        .populate("location");

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async update(req: Request, res: Response<IResponce>) {
    try {
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
        price: data.price,
        rooms: data.rooms,
        state: data.state,
        title: data.title,
        totalFloors: data.totalFloors,
        type: data.type,
        updated: currTime,
      };

      let result: IPost = await postSchema.findById(data.id);
      if (!result || !result.updated)
        throw new Error("Last post edit time is unknown");
      const updateDiff =
        currTime.getTime() - new Date(result.updated.toString()).getTime();

      if (updateDiff >= 1 * 60 * 60 * 1000) {
        result = await postSchema.findByIdAndUpdate(data.id, update, {
          new: true,
        });

        return res.status(200).json({ body: result });
      }

      return res
        .status(400)
        .json({ msg: "Post can be edited once every hour" });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async sold(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.body;
      const update: IPost = {
        sold: true,
      };

      const result = await postSchema.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true,
      });

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async avg(req: Request, res: Response<IResponce>) {
    try {
      const { locId } = req.query;

      const result = await postSchema.aggregate([
        {
          $match: {
            location: new mongoose.Types.ObjectId(String(locId)),
          },
        },
        {
          $group: {
            _id: "$location",
            p: {
              $sum: "$price",
            },
            a: {
              $sum: "$area",
            },
            ap: {
              $avg: "$price",
            },
            aa: {
              $avg: "$area",
            },
          },
        },
      ]);

      const { p, a, ap, aa } = result[0];

      return res.status(200).json({
        body: { avgPerM2: p / a, avgPrice: ap, avgArea: aa },
      });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async new(req: Request, res: Response<IResponce>) {
    try {
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
        state: data.state,
        title: data.title,
        totalFloors: data.totalFloors,
        type: data.type,
      };

      const result = await postSchema.insertMany(query);

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async search(req: Request, res: Response<IResponce>) {
    try {
      const data: IPostFilter = req.query;
      let query: any = {
        area: { $gte: Number(data.areaFrom) },
        location: data.location,
        rooms: { $gte: Number(data.minRooms) },
        price: { $lte: Number(data.priceTo) },
        type: data.type,
      };

      if (!data.areaFrom) delete query.area;
      if (!data.type) delete query.type;
      if (!data.location) delete query.location;
      if (!data.minRooms) delete query.rooms;
      if (!data.priceTo) delete query.price;

      const result = await postSchema
        .find(query)
        .populate("advertiser")
        .populate("location");

      return res.status(200).json({
        body: result,
      });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }
}
