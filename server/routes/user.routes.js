import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/role.js";
import { create } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/", [auth, admin], create);

export default userRouter;
