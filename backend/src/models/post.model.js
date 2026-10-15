import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image url is required for creating a post!!!"]
    },
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'userId is required']
    },
}, {
    timestamps: true
})

const postModel = mongoose.model("posts", postSchema);

export default postModel;