import {Router} from "express";
import {
  publishComment,
  getVideoComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:videoId/comments").post(verifyJWT, publishComment);

router.route("/:videoId/comments").get(verifyJWT, getVideoComments);

router.route("/:commentId/comments").patch(verifyJWT, updateComment);

router.route("/:commentId/comments").delete(verifyJWT, deleteComment);

export default router;
