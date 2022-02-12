import { Router } from "express";
import LocationController from "../controller/location.controller";

const locationRouter = Router();

const lc = new LocationController();

locationRouter.route("").get(lc.get);

locationRouter.route("/id/:id").delete(lc.delete);

locationRouter.route("/new").post(lc.update);

locationRouter.route("/update").patch(lc.update);

export { locationRouter };
