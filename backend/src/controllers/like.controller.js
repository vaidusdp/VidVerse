import {Like} from "../models/like.model.js";
import {Video} from "../models/video.model.js";
import {Comment} from "../models/comment.model.js";
import {APIError} from "../utils/APIError.js";
import {APIResponse} from "../utils/APIResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const {videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new APIError(404, "Video not found");
  }

  const existingLike = await Like.findOne({
    video: videoId,
    likedBy: req.user._id,
  });

  let like;
  if (existingLike !== null) {
    await Like.findByIdAndDelete(existingLike._id);
  } else {
    like = await Like.create({
      video: videoId,
      likedBy: req.user._id,
    });
  }

  return res
    .status(200)
    .json(
      like,
      new APIResponse(
        200,
        like,
        `Video ${like ? "liked" : "disliked"} successfully`,
      ),
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const {commentId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new APIError(400, "Invalid Comment Id");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new APIError(404, "Comment not found");
  }

  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });

  let like;
  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
  } else {
    like = await Like.create({
      comment: commentId,
      likedBy: req.user._id,
    });
  }

  return res
    .status(200)
    .json(
      new APIResponse(
        200,
        like,
        `Comment ${like ? "liked" : "disliked"} successfully`,
      ),
    );
});

const getLikedVideo = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const likedVideos = await Like.find({
    likedBy: userId,
    video: {$exists: true},
  }).populate({
    path: "video",
    select:
      "videoFile thumbnail title description views durationInMinutes createdAt",
  });

  return res
    .status(200)
    .json(
      new APIResponse(200, likedVideos, "Liked Videos Fetched Successfully"),
    );
});

export {toggleVideoLike, toggleCommentLike, getLikedVideo};
