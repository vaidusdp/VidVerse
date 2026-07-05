import {Router} from "express";
import {
  publishComment,
  getVideoComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:videoId/publish-comment").post(verifyJWT, publishComment);

router.route("/:videoId/get-comments").get(verifyJWT, getVideoComments);

router.route("/update-comment/:commentId").patch(verifyJWT, updateComment);

router.route("/delete-comment/:commentId").delete(verifyJWT, deleteComment);

export default router;
