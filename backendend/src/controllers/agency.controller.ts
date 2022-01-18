import express from "express";
import Logger from "js-logger";
import IAgency from "../interface/agency.interface";
import IResponce from "../interface/responce.interface";
import Agency from "../models/agency";

export default class AgencyController {
  async add(req: express.Request, res: express.Response<IResponce>) {
    const data: IAgency = req.body;
    const query: IAgency = {
      adress: data.adress,
      city: data.city,
      name: data.name,
      phone: data.phone,
      pib: data.pib,
    };
    const update: IAgency = {};

    try {
      const result = await Agency.findOneAndUpdate(query, update, {
        upsert: true,
        new: true,
      });

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }

  async remove(req: express.Request, res: express.Response<IResponce>) {
    const data: IAgency = req.body;

    try {
      const result = await Agency.findByIdAndDelete(data.id);

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({ msg: "Provided agency was not found" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }

  async all(req: express.Request, res: express.Response<IResponce>) {
    try {
      const result = await Agency.find();

      if (result) return res.status(200).json({ body: result });
      return res.status(400).json({});
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({ msg: (<Error>error).message });
    }
  }
}
