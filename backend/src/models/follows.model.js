import mongoose, { Schema } from "mongoose";


const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "follower is required!!!"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "followee is required!!!"]
    },
}, {
    timestamps: true
})

const followModel = mongoose.model("follows", followSchema);

export default followModel;