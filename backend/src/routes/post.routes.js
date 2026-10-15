import express from "express";
import { createPost } from "../controllers/post.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() })



const postRouter = express.Router();

/**
 * POST /api/posts [protected]
 *  - req.body = {caption, image-file}
 * /api/posts
 */
postRouter.post("/create", upload.single("image"), createPost);

export default postRouter;