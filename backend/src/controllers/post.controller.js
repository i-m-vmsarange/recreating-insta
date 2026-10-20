import postModel from "../models/post.model.js";
import { configDotenv } from "dotenv";
configDotenv();
import IMAGEKIT from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";

const imagekit = new IMAGEKIT({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPost(req, res) {
  const userId = req.user.sub;

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "/posts",
  });

  const { caption } = req.body;

  const post = await postModel.create({
    caption,
    imgUrl: file.url,
    user: userId,
  });

  res.status(201).json({
    message: "Post created successfully",
    post: {
      id: post._id,
      caption: post.caption,
      imgUrl: post.imgUrl,
    },
  });
}
async function getPosts(req, res) {
  const userId = req.user.sub;

  const posts = await postModel.find({
    user: userId,
  });

  if (posts.length !== 0) {
    return res.status(200).json({
      message: "Posts fetched successfully!!!",
      posts: posts,
    });
  }

  return res.status(409).json({
    message:
      "Please create some posts first!!! You don't have any posts for now!!!",
  });
}
async function getPostDetails(req, res) {
  const userId = req.user.sub;

  const postid = req.params.postid;

  const post = await postModel.findById(postid);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  if (userId !== post.user.toString()) {
    return res.status(403).json({
      message: "You are not authorized to view this post",
    });
  }

  return res.status(200).json({
    message: "Post belongs to the signed in user!!!",
    post,
  });
}
export { createPost, getPosts, getPostDetails };
