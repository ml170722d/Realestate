import { Router } from "express";
import AgencyController from "../controller/agency.controller";

const agencyRouter = Router();

const ac = new AgencyController();

agencyRouter.route("").get(ac.get);

agencyRouter.route("/id/:id").delete(ac.delete);

agencyRouter.route("").post(ac.new);

agencyRouter.route("").patch(ac.update);

export { agencyRouter };
