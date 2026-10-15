import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    const { username, email, password, bio, profileImg } = req.body;

    const dbUser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (dbUser) {
        return res.status(401).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        bio,
        profileImg
    });
    const token = jwt.sign(
        { sub: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.cookie("token", token);

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    });
}
async function loginUser(req, res) {
    const { identifier, password } = req.body;

    const dbUser = await userModel.findOne({
        $or: [
            {
                username: identifier
            },
            {
                email:
                    identifier
            }
        ]
    }).select("+password");

    if (!dbUser) {
        return res.status(404).json({
            message: "User with given email or username not found!!!"
        })
    }
    const verifyPassword = await bcrypt.compare(password, dbUser.password);

    if (!verifyPassword) {
        return res.status(401).json({
            message: "Invalid email or password!!!"
        })
    }

    const token = jwt.sign({
        sub: dbUser._id.toString()
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token);

    return res.status(200).json({
        message: "User logged in successfully!!!",
        user: dbUser
    })

}
export { registerUser, loginUser };