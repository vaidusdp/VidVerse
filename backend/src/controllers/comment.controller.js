import {Comment} from "../models/comment.model.js";
import {Video} from "../models/video.model.js";
import {APIError} from "../utils/APIError.js";
import {APIResponse} from "../utils/APIResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const publishComment = asyncHandler(async (req, res) => {
  const {videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid Video Id");
  }

  const {commentContent} = req.body;

  if (!commentContent?.trim()) {
    throw new APIError(400, "Comment Content is required");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new APIError(404, "Video not Found");
  }

  const comment = await Comment.create({
    video: videoId,
    content: commentContent,
    commentedBy: req.user?._id,
  });

  if (!comment) {
    throw new APIError(500, "Comment Creation Failed");
  }

  return res
    .status(201)
    .json(new APIResponse(201, comment, "Comment Added Successfully"));
});

const getVideoComments = asyncHandler(async (req, res) => {
  const {videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new APIError(404, "Video not Found");
  }

  const comments = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "commentedBy",
        foreignField: "_id",
        as: "commentedBy",
      },
    },
    {
      $unwind: "$commentedBy",
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        isLiked: {
          $in: [
            req.user._id,
            "$likes.likedBy",
          ],
        },
      },
    },
    {
      $project: {
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        likesCount: 1,
        isLiked: 1,

        "commentedBy._id": 1,
        "commentedBy.fullname": 1,
        "commentedBy.username": 1,
        "commentedBy.avatar": 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new APIResponse(200, comments, "Comments Fetched Successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const {commentId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new APIError(400, "Invaild Comment Id");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new APIError(404, "Comment does not exists");
  }

  if (comment.commentedBy.toString() !== req.user._id.toString()) {
    throw new APIError(403, "You are not authorized to edit this comment");
  }

  const {updatedContent} = req.body;
  if (!updatedContent?.trim()) {
    throw new APIError(400, "Comment Content is Required");
  }
  comment.content = updatedContent;

  await comment.save({validateBeforeSave: false});

  return res
    .status(200)
    .json(new APIResponse(200, comment, "Comment Updated Sucessfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const {commentId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new APIError(400, "Invaild Comment Id");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new APIError(404, "Comment does not exists");
  }

  if (comment.commentedBy.toString() !== req.user._id.toString()) {
    throw new APIError(403, "You are not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new APIResponse(200, {}, "Comment Deleted Successfully"));
});

export {publishComment, getVideoComments, updateComment, deleteComment};
