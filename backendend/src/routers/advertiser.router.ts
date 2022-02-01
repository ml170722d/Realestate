import { Router } from "express";
import AdvertiserController from "../controllers/advertiser.controller";

const advertiserRouter = Router();

advertiserRouter.route("").get((req, res) => {
  new AdvertiserController().getByAdvertiser(req, res);
});

advertiserRouter.route("").patch((req, res) => {
  new AdvertiserController().updateProfile(req, res);
});

export { advertiserRouter };
