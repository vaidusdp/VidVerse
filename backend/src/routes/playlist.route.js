import {Router} from "express";
import {
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
  getUserPlaylists,
} from "../controllers/playlist.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-playlist").post(verifyJWT, createPlaylist);
router.route("/p/:playlistId").get(verifyJWT, getPlaylistById);
router.route("/update-playlist/:playlistId").patch(verifyJWT, updatePlaylist);
router.route("/delete-playlist/:playlistId").delete(verifyJWT, deletePlaylist);
router
  .route("/add-video/:playlistId/:videoId")
  .patch(verifyJWT, addVideoToPlaylist);
router
  .route("/delete-video/:playlistId/:videoId")
  .patch(verifyJWT, deleteVideoFromPlaylist);
router.route("/user-playlists/:userId").get(verifyJWT, getUserPlaylists);

export default router;
