import express from "express";
import { createPost, getPosts, getPostDetails } from "../controllers/post.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() })



const postRouter = express.Router();

/**
 * POST /api/posts [protected]
 *  - req.body = {caption, image-file}
 * /api/posts
 */
postRouter.post("/create", upload.single("image"), createPost);

/**
 * GET /api/posts [protected]
 *  - req.body = {}
 * /api/posts
 */
postRouter.get("/getPosts", getPosts)

/**
 * GET /api/posts/details/:id
 * return details about the post with given id
 */
postRouter.get("/details/:postid", getPostDetails)

export default postRouter;