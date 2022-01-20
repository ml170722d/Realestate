import express from "express";
import Location from "../models/location";
import ILocation from "../interface/location.interface";
import IResponce from "../interface/responce.interface";
import Logger from "js-logger";

export default class LocationController {
  async add(req: express.Request, res: express.Response<IResponce>) {
    const data: ILocation = req.body;
    const query: ILocation = {
      street: data.street,
      city: data.city,
      municipality: data.municipality,
    };
    const update: ILocation = {
      microlocations: data.microlocations,
    };

    try {
      const result = await Location.findOneAndUpdate(
        query,
        {
          $addToSet: update,
        },
        { upsert: true, new: true }
      );

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }

  // FIX Can't delete microlocation if its used in at leat one post
  async remove(req: express.Request, res: express.Response<IResponce>) {
    const data: ILocation = req.body;

    try {
      const result = await Location.findByIdAndDelete(data.id);

      if (result) return res.status(200).json({ body: result });
      return res
        .status(400)
        .json({ msg: "Provided microlocation was not found" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }

  async all(req: express.Request, res: express.Response<IResponce>) {
    try {
      const result = await Location.find();

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }

  async get(req: express.Request, res: express.Response<IResponce>) {
    const { id } = req.query;
    try {
      const result = await Location.findById(id);

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }

  //TODO Let microlocation[location] be deleted if it's unused
}
