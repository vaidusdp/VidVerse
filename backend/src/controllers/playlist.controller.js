import {Playlist} from "../models/playlist.model.js";
import {User} from "../models/user.model.js";
import {Video} from "../models/video.model.js";
import {APIError} from "../utils/APIError.js";
import {APIResponse} from "../utils/APIResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const createPlaylist = asyncHandler(async (req, res) => {
  const {name, description} = req.body;

  if (!name?.trim()) {
    throw new APIError(400, "Playlist Name is Required");
  }

  const playlist = await Playlist.create({
    name: name,
    description: description || "",
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new APIResponse(201, playlist, "Playlist Created Successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const {playlistId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new APIError(400, "Playlist Id is Invalid");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new APIError(404, "Playlist not found");
  }

  return res
    .status(200)
    .json(new APIResponse(200, playlist, "Playist Fetched Successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const {playlistId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new APIError(400, "Playlist Id is Invalid");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new APIError(404, "Playlist not found");
  }

  if (playlist.owner.toString() !== req.user?._id.toString()) {
    throw new APIError(403, "You are not authorized to update this playlist");
  }

  const {name, description} = req.body;

  if (name) {
    playlist.name = name;
  }

  if (description) {
    playlist.description = description;
  }

  await playlist.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .json(new APIResponse(200, playlist, "Playlist Updated Successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const {playlistId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new APIError(400, "Playlist Id is Invalid");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new APIError(404, "Playlist not found");
  }

  if (playlist.owner.toString() !== req.user?._id.toString()) {
    throw new APIError(403, "You are not authorized to delete this playlist");
  }

  await Playlist.findByIdAndDelete(playlistId);

  return res
    .status(200)
    .json(new APIResponse(200, {}, "Playlist Deleted Successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const {playlistId, videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new APIError(400, "Invalid Playlist Id");
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid Video Id");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new APIError(404, "Plylist Not Found");
  }

  if (playlist.owner.toString() !== req.user?._id.toString()) {
    throw new APIError(
      403,
      "You are not authorized to add video to this playlist",
    );
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new APIError(404, "Video not found");
  }

  if (playlist.videos.some((vid) => vid.toString() === videoId)) {
    throw new APIError(400, "Video already in playlist");
  }

  playlist.videos.push(videoId);
  await playlist.save({validateBeforeSave: false});

  return res
    .status(200)
    .json(
      new APIResponse(200, playlist, "Video added successfully to Playlist"),
    );
});

const deleteVideoFromPlaylist = asyncHandler(async (req, res) => {
  const {playlistId, videoId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new APIError(400, "Invalid Playlist Id");
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new APIError(400, "Invalid Video Id");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new APIError(404, "Plylist Not Found");
  }

  if (playlist.owner.toString() !== req.user?._id.toString()) {
    throw new APIError(
      403,
      "You are not authorized to remove video to this playlist",
    );
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new APIError(404, "Video not found");
  }

  if (!playlist.videos.some((vid) => vid.toString() === videoId)) {
    throw new APIError(404, "Video not found in playlist");
  }

  playlist.videos = playlist.videos.filter((vid) => vid.toString() !== videoId);
  await playlist.save({validateBeforeSave: false});

  return res
    .status(200)
    .json(
      new APIResponse(200, playlist, "Video removed successfully to Playlist"),
    );
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const {userId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new APIError(400, "Invalid user Id");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new APIError(404, "User Not Found");
  }

  const playlists = await Playlist.find({
    owner: userId,
  })
    .sort({
      createdAt: -1,
    })
    .populate("videos", "title thumbnail views");

  return res
    .status(200)
    .json(
      new APIResponse(200, playlists, "User Playlists Fetched Successfully"),
    );
});

export {
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
  getUserPlaylists,
};
