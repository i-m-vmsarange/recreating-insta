import express from "express";
import identifyUser from "../middlewares/auth.middleware.js";
import { fetchFollowers, followUser } from "../controllers/user.controller.js";
const userRouter = express.Router();

/**
 * @route POST api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */

userRouter.post("/follow/:username", identifyUser, followUser);

/**
 * @route GET api/users/followers/:username
 * @description find f`ollowers
 * @access Private
 */
userRouter.get("/followers/:username", identifyUser, fetchFollowers);
export default userRouter;
