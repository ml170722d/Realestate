import express from "express";
import Logger from "js-logger";
import Agency from "../models/agency";
import IResponce from "../interface/responce.interface";
import IAgency from "../interface/agency.interface";

export default class AgencyController {
  async newAgency(req: express.Request, res: express.Response<IResponce>) {
    const agency: IAgency = req.body;
    try {
      const result: IAgency[] = await Agency.insertMany({
        pib: agency.pib,
        adress: agency.adress,
        city: agency.city,
        name: agency.name,
        phone: agency.phone,
        workers: agency.workers,
      });
      if (result) {
        return res.status(200).json();
      }
      return res.status(400).json();
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json();
    }
  }

  async getAgency(req: express.Request, res: express.Response<IResponce>) {
    const info: IAgency = req.body;
    try {
      let agency: IAgency | null = null;
      let promise = null;
      if (info.id) {
        promise = Agency.findById(info.id);
      } else if (info.name) {
        promise = Agency.findOne({ name: info.name });
      }

      if (promise) agency = await promise.populate("workers");

      if (agency) {
        return res.status(200).json({ body: agency });
      }
      return res.status(400).json({ msg: "Bad agency id or name provided" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json();
    }
  }

  async getAllAgencies(req: express.Request, res: express.Response<IResponce>) {
    try {
      const agency: IAgency[] = await Agency.find();
      return res.status(200).json({ body: agency });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json();
    }
  }

  async getEmployees(req: express.Request, res: express.Response<IResponce>) {
    const info: IAgency = req.body;
    try {
      let agency: IAgency | null = null;
      let promise = null;
      if (info.id) {
        promise = Agency.findById(info.id);
      } else if (info.name) {
        promise = Agency.findOne({ name: info.name });
      }

      if (promise) agency = await promise.populate("workers");

      if (agency) {
        return res.status(200).json({ body: agency.workers });
      }
      return res.status(400).json({ msg: "Bad agency id or name provided" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json();
    }
  }
}
