import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  // console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.user = decodedToken;
  next();
}

export default identifyUser;
