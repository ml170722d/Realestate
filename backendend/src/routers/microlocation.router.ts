import { Router } from "express";
import MicrolocationController from "../controllers/microlocation.controller";

const mlRouter = Router();

mlRouter.route("").get((req, res) => {
  new MicrolocationController().all(req, res);
});

mlRouter.route("/:id").get((req, res) => {
  new MicrolocationController().get(req, res);
});

mlRouter.route("").post((req, res) => {
  new MicrolocationController().add(req, res);
});

mlRouter.route("").delete((req, res) => {
  new MicrolocationController().remove(req, res);
});

export { mlRouter };
