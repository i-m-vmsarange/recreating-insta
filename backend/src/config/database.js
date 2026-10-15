import mongoose from "mongoose";

async function connectToDb() {
    await mongoose.connect(process.env.MONGODB_URI).then((res) => {
        console.log("Connected to MONGO DB");
    }).catch((error) => {
        console.log("Something went wrong while connecting to database!!!", error);
    })
}

export default connectToDb;