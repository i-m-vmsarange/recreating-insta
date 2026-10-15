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

export { createPost }