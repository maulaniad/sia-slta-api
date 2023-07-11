import { create, findAll, findById } from "../controllers/siswa.controller.js";
import Router from "express";

const siswaRouter = Router();

siswaRouter.get("/", findAll);
siswaRouter.post("/", create);
siswaRouter.get("/:id", findById);

export default siswaRouter;
