import {Router} from "express";
import {
  toggleVideoLike,
  toggleCommentLike,
  getLikedVideo,
} from "../controllers/like.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:videoId/likes").post(verifyJWT, toggleVideoLike);
router.route("/c/:commentId/likes").post(verifyJWT, toggleCommentLike);
router.route("/me/liked-videos").get(verifyJWT, getLikedVideo);

export default router;
