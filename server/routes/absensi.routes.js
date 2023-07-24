import { Router } from "express";
import { create, findAll, update } from "../controllers/absensi.controller.js";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/role.js";

const absensiRouter = Router();

absensiRouter.post("/", [auth, admin], create);
absensiRouter.get("/:id", [auth, admin], findAll);
absensiRouter.put("/:id", [auth, admin], update);

export default absensiRouter;
