import { Router } from "express";
import { create, findAll, findById, update, deleteById } from "../controllers/siswa.controller.js";
import auth from "../middleware/auth.js";
import { admin, siswa } from "../middleware/role.js";

const siswaRouter = Router();

siswaRouter.get("/", [auth, siswa], findAll);
siswaRouter.post("/", [auth, admin], create);
siswaRouter.get("/:id", [auth, siswa], findById);
siswaRouter.put("/:id", [auth, siswa], update);
siswaRouter.delete("/:id", [auth, admin], deleteById)

export default siswaRouter;
