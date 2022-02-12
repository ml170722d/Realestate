import { Request, Response } from "express";
import Logger from "js-logger";
import IAgency from "../interface/agency.interface";
import IResponce from "../interface/responce.interface";
import agencySchema from "../shema/agency.schema";

export default class AgencyController {
  async get(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.query;

      let promise;
      if (id) {
        promise = agencySchema.findById(id);
      } else {
        promise = agencySchema.find();
      }

      const result = await promise;

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async new(req: Request, res: Response<IResponce>) {
    try {
      const data: IAgency = req.body;
      const query: IAgency = {
        address: data.address,
        city: data.city,
        name: data.name,
        phone: data.phone,
        pib: Number(data.pib),
      };

      const result = await agencySchema.insertMany(query);

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async update(req: Request, res: Response<IResponce>) {
    try {
      const data: IAgency = req.body;
      const update: IAgency = {
        address: data.address,
        city: data.city,
        name: data.name,
        phone: data.phone,
        pib: Number(data.pib),
      };

      const result = await agencySchema.findByIdAndUpdate(data.id, update, {
        runValidators: true,
        new: true,
      });

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }

  async delete(req: Request, res: Response<IResponce>) {
    try {
      const { id } = req.params;

      const result = await agencySchema.findByIdAndDelete(id);

      return res.status(200).json({ body: result });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({});
    }
  }
}
