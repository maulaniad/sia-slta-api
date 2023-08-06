import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/role.js";
import { findAll } from "../controllers/konsentrasi.controller.js";

const konsentrasiRouter = Router()

konsentrasiRouter.get("/", [auth, admin], findAll);

export default konsentrasiRouter;
