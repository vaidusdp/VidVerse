import {Video} from "../models/video.model.js";
import {User} from "../models/user.model.js";
import {Subscription} from "../models/subscription.model.js";
import {Playlist} from "../models/playlist.model.js";
import {APIError} from "../utils/APIError.js";
import {APIResponse} from "../utils/APIResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js";
import mongoose from "mongoose";
import {Like} from "../models/like.model.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const videos = await Video.find({
    owner: userId,
  });

  const totalVideos = videos.length;

  const totalViews = videos.reduce((acc, video) => acc + video.views, 0);

  const totalSubscribers = await Subscription.countDocuments({
    channel: userId,
  });

  const videoIds = videos.map((video) => video._id);

  const totalLikes = await Like.countDocuments({
    video: {
      $in: videoIds,
    },
  });

  return res.status(200).json(
    new APIResponse(
      200,
      {
        totalVideos,
        totalViews,
        totalSubscribers,
        totalLikes,
      },
      "Channel Stats Fetched Successfully",
    ),
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const videos = await Video.find({
    owner: userId,
  }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new APIResponse(200, videos, "Channel Videos Fetched Successfully"));
});

export {getChannelStats, getChannelVideos};
