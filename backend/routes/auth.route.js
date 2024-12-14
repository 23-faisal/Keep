import { Router } from "express";
import {
  signInController,
  singUpController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

// sign up
authRouter.post("/sign-up", singUpController);

// sign in
authRouter.post("/sign-in", signInController);

export default authRouter;
