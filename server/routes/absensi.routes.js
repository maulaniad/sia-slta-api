import { Router } from "express";
import { create, findAll, update } from "../controllers/absensi.controller.js";

const absensiRouter = Router();

absensiRouter.post("/", create);
absensiRouter.get("/:id", findAll);
absensiRouter.put("/:id", update);

export default absensiRouter;
