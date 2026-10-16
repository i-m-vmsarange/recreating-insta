import postModel from "../models/post.model.js";
import { configDotenv } from "dotenv";
configDotenv();
import IMAGEKIT from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";

const imagekit = new IMAGEKIT({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})


async function createPost(req, res) {

    const token = req.cookies.token;

    console.log(token);

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: req.file.originalname,
        folder: "/posts"
    })

    const { caption } = req.body;

    const post = await postModel.create({
        caption,
        imgUrl: file.url,
        user: decodedToken.sub
    });

    res.status(201).json({
        message: "Post created successfully",
        post: {
            id: post._id,
            caption: post.caption,
            imgUrl: post.imgUrl
        }
    });


}
async function getPosts(req, res) {

    const token = req.cookies.token;

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized!!"
        })
    }

    const posts = await postModel.find({
        user: decoded.sub
    });

    if (posts.length !== 0) {
        return res.status(200).json({
            message: "Posts fetched successfully!!!",
            posts: posts
        })
    }

    return res.status(409).json({
        message: "Please create some posts first!!! You don't have any posts for now!!!"
    })

}
async function getPostDetails(req, res) {
    const token = req.cookies.token;
    const { postid } = req.params;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized!!"
        })
    }

    if (!/^[a-f\d]{24}$/i.test(postid)) {
        return res.status(400).json({
            message: "Invalid post ID"
        });
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token!!"
        })
    }

    const userId = decoded.sub;

    const post = await postModel.findById(postid);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    if (userId !== post.user.toString()) {
        return res.status(403).json({
            message: "You are not authorized to view this post"
        });
    }

    return res.status(200).json({
        message: "Post belongs to the signed in user!!!",
        post
    });
}
export { createPost, getPosts, getPostDetails }