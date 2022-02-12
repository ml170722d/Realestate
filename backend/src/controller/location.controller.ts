import { Request, Response } from "express";
import Logger from "js-logger";
import ILocation from "../interface/location.interface";
import IResponce from "../interface/responce.interface";
import locationSchema from "../shema/location.schema";
import postSchema from "../shema/post.schema";
import mongoose from "mongoose";

export default class LocationController {
  async get(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.query;

      let promise;
      if (id) {
        promise = locationSchema.findById(id);
      } else {
        promise = locationSchema.find();
      }

      const result = await promise;

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async delete(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.params;

      let result = await postSchema.find({
        location: new mongoose.Types.ObjectId(id),
      });

      if (result.length > 0)
        return res
          .status(400)
          .json({ msg: "Location is in use. It can be deleted!" });

      result = await locationSchema.findByIdAndDelete(id);

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async update(req: Request, res: Response<IResponce>) {
    try {
      const data: ILocation = req.body;
      const query: ILocation = {
        city: data.city,
        municipality: data.municipality,
        street: data.street,
      };
      const update: ILocation = {
        microlocations: data.microlocations,
      };

      const result = await locationSchema.findOneAndUpdate(query, update, {
        runValidators: true,
        new: true,
        upsert: true,
      });

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }
}
