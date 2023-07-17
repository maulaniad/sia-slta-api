import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/role.js";
import { create, findAll, findById, update, deleteById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", [auth, admin], findAll);
userRouter.get("/:id", [auth, admin], findById);
userRouter.post("/", [auth, admin], create);
userRouter.put("/:id", [auth, admin], update);
userRouter.delete("/:id", [auth, admin], deleteById);

export default userRouter;
