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
router.route("/get-playlist/:playlistId").get(verifyJWT, getPlaylistById);
router.route("/update-playlist/:playlistId").patch(verifyJWT, updatePlaylist);
router.route("/delete/:playlistId").delete(verifyJWT, deletePlaylist);
router.route("/add-video/p/:playlistId/v/:videoId").patch(verifyJWT, addVideoToPlaylist);
router
  .route("/delete-video/p/:playlistId/v/:videoId")
  .delete(verifyJWT, deleteVideoFromPlaylist);
router.route("/users/:userId").get(verifyJWT, getUserPlaylists);

export default router;
