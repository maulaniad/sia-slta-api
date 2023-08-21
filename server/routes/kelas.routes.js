import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin, siswa } from "../middleware/role.js";
import {
  create,
  findAll,
  findAllSiswa,
  update,
  deleteById
} from "../controllers/kelas.controller.js";

const kelasRouter = Router();

kelasRouter.post("/", [auth, admin], create)
kelasRouter.get("/", [auth, admin], findAll);
kelasRouter.get("/:id", [auth, siswa], findAllSiswa);
kelasRouter.put("/:id", [auth, admin], update);
kelasRouter.delete("/:id", [auth, admin], deleteById);

export default kelasRouter;
