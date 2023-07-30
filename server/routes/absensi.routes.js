import { Router } from "express";
import { create, findAll, findAllByDate, update } from "../controllers/absensi.controller.js";
import auth from "../middleware/auth.js";
import { admin, siswa } from "../middleware/role.js";

const absensiRouter = Router();

absensiRouter.post("/", [auth, admin], create);
absensiRouter.post("/tanggal", [auth, admin], findAllByDate);
absensiRouter.get("/:id", [auth, siswa], findAll);
absensiRouter.put("/:id", [auth, admin], update);

export default absensiRouter;
