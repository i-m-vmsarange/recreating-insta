import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/get-me", identifyUser, getMe)

export default authRouter;