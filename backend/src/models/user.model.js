import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exists"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, 'email already exists']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },

    bio: {
        type: String,
    },
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/nitpldev/default-image.jpg?updatedAt=1771351767804",
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("users", userSchema);

export default userModel;