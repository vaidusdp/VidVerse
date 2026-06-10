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

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  const pipeline = [];

  pipeline.push({
    $match: {
      isPublished: true,
    },
  });

  if (search) {
    pipeline.push({
      $match: {
        title: {
          $regex: search,
          $options: "i",
        },
      },
    });
  }

  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    pipeline.push({
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    });
  }

  pipeline.push({
    $lookup: {
      from: "users",
      localField: "owner",
      foreignField: "_id",
      as: "owner",
    },
  });

  pipeline.push({
    $unwind: "$owner",
  });

  pipeline.push({
    $project: {
      videoFile: 1,
      thumbnail: 1,
      title: 1,
      description: 1,
      durationInMinutes: 1,
      views: 1,
      createdAt: 1,
      isPublished: 1,
      "owner._id": 1,
      "owner.fullname": 1,
      "owner.username": 1,
      "owner.avatar": 1,
    },
  });

  const allowedSortFields = ["createdAt", "views", "title"];

  const finalSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

  pipeline.push({
    $sort: {
      [finalSortBy]: sortType === "asc" ? 1 : -1,
    },
  });

  const skip = (Number(page) - 1) * Number(limit);

  pipeline.push({
    $skip: skip,
  });

  pipeline.push({
    $limit: Number(limit),
  });

  const videos = await Video.aggregate(pipeline);

  return res
    .status(200)
    .json(new APIResponse(200, videos, "Videos Fetched Successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const {videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new APIError(404, "Video not found");
  }

  const userId = req.user?._id;
  if (video.owner.toString() !== userId.toString()) {
    throw new APIError(
      403,
      "You are not authorized to modify any content of this video.",
    );
  }

  video.isPublished = !video.isPublished;

  await video.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .json(
      new APIResponse(
        201,
        video,
        `Video ${video.isPublished ? "published" : "unpublished"} successfully`,
      ),
    );
});

const updateVideo = asyncHandler(async (req, res) => {
  const {videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new APIError(404, "Video not found");
  }

  const userId = req.user?._id;
  if (video.owner.toString() !== userId.toString()) {
    throw new APIError(
      403,
      "You are not authorized to modify any content of this video.",
    );
  }

  const {title, description} = req.body;

  if (title) {
    video.title = title;
  }

  if (description) {
    video.description = description;
  }

  const thumbnailLocalFile = req.files?.thumbnail?.[0]?.path;
  if (thumbnailLocalFile) {
    const thumbnail = await uploadOnCloudinary(thumbnailLocalFile, "image");

    if (!thumbnail?.url) {
      throw new APIError(500, "Thumbnail Upload Failed");
    }

    video.thumbnail = thumbnail.url;
  }

  await video.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .json(new APIResponse(200, video, "Video Updated Successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const {videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new APIError(404, "Video not found");
  }

  const userId = req.user?._id;
  if (video.owner.toString() !== userId.toString()) {
    throw new APIError(403, "You are not authorized to modify this video.");
  }

  await Video.findByIdAndDelete(videoId);

  return res
    .status(200)
    .json(new APIResponse(200, {}, "Video Deleted Successfully"));
});
