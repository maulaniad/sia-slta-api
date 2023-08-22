import { Router } from "express";
import auth from "../middleware/auth.js";
import { siswa } from "../middleware/role.js";
import { findAll } from "../controllers/semester.controller.js";

const semesterRouter = Router();

semesterRouter.get("/", [auth, siswa], findAll);

export default semesterRouter;
