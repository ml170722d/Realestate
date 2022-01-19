import { Router } from "express";
import MicrolocationController from "../controllers/location.controller";

const locRouter = Router();

locRouter.route("").get((req, res) => {
  new MicrolocationController().all(req, res);
});

locRouter.route("/:id").get((req, res) => {
  new MicrolocationController().get(req, res);
});

locRouter.route("").post((req, res) => {
  new MicrolocationController().add(req, res);
});

locRouter.route("").delete((req, res) => {
  new MicrolocationController().remove(req, res);
});

export { locRouter };
