import express from "express";
import AgencyController from "../controllers/agency.contorller";

const agencyRouter = express.Router();

agencyRouter
  .route("/getAgency")
  .get((req, res) => new AgencyController().getAgency(req, res));

agencyRouter
  .route("/getEmployees")
  .get((req, res) => new AgencyController().getEmployees(req, res));

agencyRouter
  .route("/getAllAgencies")
  .get((req, res) => new AgencyController().getAllAgencies(req, res));

agencyRouter
  .route("/newAgency")
  .post((req, res) => new AgencyController().newAgency(req, res));
export default agencyRouter;
