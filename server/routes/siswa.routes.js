import Router from "express";
import { create, findAll, findById, update } from "../controllers/siswa.controller.js";

const siswaRouter = Router();

siswaRouter.get("/", findAll);
siswaRouter.post("/", create);
siswaRouter.get("/:id", findById);
siswaRouter.put("/:id", update);

export default siswaRouter;
