import mongoose from "mongoose"


const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})


likeSchema.index({ post: 1, user: 1 }, { unique: true });


const likeModel = mongoose.model("likes", likeSchema);

export default likeModel;