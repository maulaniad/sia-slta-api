import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/role.js";
import {
  create,
  findAll,
  findAllUnused,
  findById,
  update,
  deleteById
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/unused", [auth, admin], findAllUnused);
userRouter.get("/:id", [auth, admin], findById);
userRouter.get("/", [auth, admin], findAll);
userRouter.post("/", [auth, admin], create);
userRouter.put("/:id", [auth, admin], update);
userRouter.delete("/:id", [auth, admin], deleteById);

export default userRouter;
