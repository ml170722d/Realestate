import express from "express";
import Microlocation from "../models/microlocation";
import IMicrolocation from "../interface/microlocation.interface";
import IResponce from "../interface/responce.interface";
import Logger from "js-logger";

export default class MicrolocationController {
  async add(req: express.Request, res: express.Response<IResponce>) {
    const data: IMicrolocation = req.body;
    const query: IMicrolocation = {
      street: data.street,
      city: data.city,
      municipality: data.municipality,
    };
    const update: IMicrolocation = {
      locations: data.locations,
    };

    try {
      const result = await Microlocation.findOneAndUpdate(
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

  async remove(req: express.Request, res: express.Response) {
    const data: IMicrolocation = req.body;

    try {
      const result = await Microlocation.findByIdAndDelete(data.id);

      if (result) return res.status(200).json({ body: result });
      return res
        .status(400)
        .json({ msg: "Provided microlocation was not found" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }

  async all(req: express.Request, res: express.Response) {
    try {
      const result = await Microlocation.find();

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }
}
