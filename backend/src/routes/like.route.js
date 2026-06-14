import {Router} from "express";
import {
  toggleVideoLike,
  toggleCommentLike,
  getLikedVideo,
} from "../controllers/like.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/toggle-video-like/:videoId").post(verifyJWT, toggleVideoLike);
router
  .route("/toggle-comment-like/:commentId")
  .post(verifyJWT, toggleCommentLike);
router.route("/get-liked-videos").get(verifyJWT, getLikedVideo);

export default router;
