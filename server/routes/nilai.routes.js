import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin, siswa } from "../middleware/role.js";
import { create, findAll, findById, update, deleteByIds } from "../controllers/nilai.controller.js";

const nilaiRouter = Router();

nilaiRouter.get("/siswa/:id", [auth, siswa], findById);
nilaiRouter.get("/:id", [auth, admin], findAll);
nilaiRouter.post("/", [auth, admin], create);
nilaiRouter.put("/", [auth, admin], update);
nilaiRouter.delete("/", [auth, admin], deleteByIds);

export default nilaiRouter;
