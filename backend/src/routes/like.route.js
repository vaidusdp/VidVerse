import {Router} from "express";
import {
  toggleVideoLike,
  toggleCommentLike,
  getLikedVideo,
} from "../controllers/like.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:videoId/toggle-like").post(verifyJWT, toggleVideoLike);
router.route("/c/:commentId/toggle-like").post(verifyJWT, toggleCommentLike);
router.route("/me/liked-videos").get(verifyJWT, getLikedVideo);

export default router;
