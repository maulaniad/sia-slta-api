import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/role.js";
import { findAll } from "../controllers/semester.controller.js";

const semesterRouter = Router();

semesterRouter.get("/", [auth, admin], findAll);

export default semesterRouter;
