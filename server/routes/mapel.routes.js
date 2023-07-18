import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin, siswa } from "../middleware/role.js";
import { findAll, findById, create, update, deleteById } from "../controllers/mapel.controller.js";

const mapelRouter = Router();

mapelRouter.get("/", [auth, siswa], findAll);
mapelRouter.get("/:id", [auth, siswa], findById);
mapelRouter.post("/", [auth, admin], create);
mapelRouter.put("/:id", [auth, admin], update);
mapelRouter.delete("/:id", [auth, admin], deleteById);

export default mapelRouter;
