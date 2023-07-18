import { Router } from "express";
import { create, findAll, findById, update, deleteById } from "../controllers/siswa.controller.js";
import auth from "../middleware/auth.js";
import { admin, siswa } from "../middleware/role.js";

const siswaRouter = Router();

siswaRouter.get("/:id", [auth, siswa], findById);
siswaRouter.get("/", [auth, siswa], findAll);
siswaRouter.put("/update", [auth, siswa], update);
siswaRouter.post("/", [auth, admin], create);
siswaRouter.put("/:id", [auth, admin], update);
siswaRouter.delete("/:id", [auth, admin], deleteById);

export default siswaRouter;
