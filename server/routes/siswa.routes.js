import { findAll } from "../controllers/siswa.controller.js";
import Router from "express";

const siswaRouter = Router();

siswaRouter.get("/", findAll);

export default siswaRouter;
