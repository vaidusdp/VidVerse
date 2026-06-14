import {Router} from "express";
import {
  publishComment,
  getVideoComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/publish-comment/:videoId").post(verifyJWT, publishComment);

router.route("/get-comments/:videoId").get(verifyJWT, getVideoComments);

router.route("/update-comment/:commentId").patch(verifyJWT, updateComment);

router.route("/delete-comment/:commentId").delete(verifyJWT, deleteComment);

export default router;
