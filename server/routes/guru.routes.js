import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/role.js";
import {
  create,
  findAll,
  findById,
  update,
  deleteById
} from "../controllers/guru.controller.js";

const guruRouter = Router();

guruRouter.post("/", [auth, admin], create)
guruRouter.get("/", [auth, admin], findAll);
guruRouter.get("/:id", [auth, admin], findById);
guruRouter.put("/:id", [auth, admin], update);
guruRouter.delete("/:id", [auth, admin], deleteById);

export default guruRouter;
