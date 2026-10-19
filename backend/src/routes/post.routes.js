import express from "express";
import identifyUser from "../middlewares/auth.middleware.js";
import { createPost, getPosts, getPostDetails } from "../controllers/post.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() })



const postRouter = express.Router();

/**
 * POST /api/posts [protected]
 *  - req.body = {caption, image-file}
 * /api/posts
 */
postRouter.post("/create", identifyUser, upload.single("image"), createPost);

/**
 * GET /api/posts [protected]
 *  - req.body = {}
 * /api/posts
 */
postRouter.get("/getPosts", identifyUser, getPosts)

/**
 * GET /api/posts/details/:id
 * return details about the post with given id
 */
postRouter.get("/details/:postid", identifyUser, getPostDetails)

export default postRouter;