import { Router } from "express";
import AgencyController from "../controllers/agency.controller";

const agencyRouter = Router();

agencyRouter.route("").get((req, res) => {
  new AgencyController().all(req, res);
});

agencyRouter.route("").post((req, res) => {
  new AgencyController().add(req, res);
});

agencyRouter.route("").delete((req, res) => {
  new AgencyController().remove(req, res);
});

export { agencyRouter };
