import {User} from "../models/user.model.js";
import {Video} from "../models/video.model.js";
import {APIError} from "../utils/APIError.js";
import {APIResponse} from "../utils/APIResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const publishVideo = asyncHandler(async (req, res) => {
  const {title, description} = req.body;

  if (!title || !description) {
    throw new APIError(400, "Title and Description required for video");
  }

  const videoLocalFile = req.files?.video?.[0]?.path;
  const thumbnailLocalFile = req.files?.thumbnail?.[0]?.path;

  if (!videoLocalFile) {
    throw new APIError(400, "Video is required");
  }

  if (!thumbnailLocalFile) {
    throw new APIError(400, "Thumbnail is required");
  }

  let video;
  try {
    video = await uploadOnCloudinary(videoLocalFile);
    console.log("Video Uploaded", video);
  } catch (error) {
    console.log("Video Uploaded Failed: " + error);
    throw new APIError(500, "Failed To Upload Video");
  }

  let thumbnail;
  try {
    thumbnail = await uploadOnCloudinary(thumbnailLocalFile);
    console.log("Thumbnail Uploaded", thumbnail);
  } catch (error) {
    console.log("Thumbnail Uploaded Failed: " + error);
    throw new APIError(500, "Failed To Upload Thumbnail");
  }

  if (!video?.url) {
    throw new APIError(500, "Video upload failed");
  }

  if (!thumbnail?.url) {
    throw new APIError(500, "Thumbnail upload failed");
  }

  try {
    const videoCreated = await Video.create({
      videoFile: video.url,
      thumbnail: thumbnail.url,
      title,
      description,
      durationInMinutes: Math.ceil(video.duration / 60),
      owner: req.user._id,
      isPublished: true,
    });

    if (!videoCreated) {
      throw new APIError(500, "Something went wrong while uploading video");
    }

    return res
      .status(201)
      .json(new APIResponse(200, videoCreated, "Video Published Successfully"));
  } catch (error) {
    console.log("Video Publishing Failed");
    if (video?.public_id) await deleteFromCloudinary(video.public_id, "video");
    if (thumbnail?.public_id)
      await deleteFromCloudinary(thumbnail.public_id, "image");

    throw new APIError(
      500,
      "Something went wrong while publishing video and files deleted",
    );
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const {videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid video id");
  }

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
        isPublished: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {$unwind: "$owner"},
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        durationInMinutes: 1,
        views: 1,
        createdAt: 1,

        "owner._id": 1,
        "owner.fullname": 1,
        "owner.username": 1,
        "owner.avatar": 1,
        "owner.coverImage": 1,
      },
    },
  ]);

  if (!video?.length) {
    throw new APIError(404, "Video not found");
  }

  await Video.findByIdAndUpdate(videoId, {
    $inc: {
      views: 1,
    },
  });

  return res
    .status(200)
    .json(new APIResponse(200, video[0], "Video Uploaded Successfully"));
});
