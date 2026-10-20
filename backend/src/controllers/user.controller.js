import followModel from "../models/follows.model.js";
import userModel from "../models/user.model.js";

async function followUser(req, res) {
  const username = req.params.username;
  const loggedInUser = req.user.username;
  const follower = req.user.sub;

  if (!loggedInUser) {
    return res.status(401).json({
      message: "Unauthorized!!!",
    });
  }

  if (username === loggedInUser) {
    return res.status(400).json({
      message: "You cannot follow yourself!!!",
    });
  }

  const dbUser = await userModel.findOne({
    username,
  });

  if (!dbUser) {
    return res.status(404).json({
      message: `username you are looking for does not exist!!!`,
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    $and: {
      follower,
      followee: dbUser._id,
    },
  });

  if (isAlreadyFollowing) {
    return res.status(400).json({
      message: `${loggedInUser} already follows ${username}!!!`,
    });
  }

  const followRecord = await followModel.create({
    follower,
    followee: dbUser._id,
  });

  return res.status(201).json({
    message: `${loggedInUser} follows ${dbUser.username}`,
    followRecord,
  });
}
async function fetchFollowers(req, res) {}
export { followUser, fetchFollowers };
