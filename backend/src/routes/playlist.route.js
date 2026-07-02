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

router.route("/playlist").post(verifyJWT, createPlaylist);
router.route("/:playlistId").get(verifyJWT, getPlaylistById);
router.route("/:playlistId").patch(verifyJWT, updatePlaylist);
router.route("/:playlistId").delete(verifyJWT, deletePlaylist);
router
  .route("/p/:playlistId/v/:videoId")
  .patch(verifyJWT, addVideoToPlaylist);
router
  .route("/p/:playlistId/v/:videoId")
  .delete(verifyJWT, deleteVideoFromPlaylist);
router.route("/users/:userId").get(verifyJWT, getUserPlaylists);

export default router;
