import {Router} from "express";
import {
  publishVideo,
  getVideoById,
  getAllVideos,
  togglePublishStatus,
  updateVideo,
  deleteVideo,
  getMyVideos,
  getChannelVideos,
} from "../controllers/video.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/publish-video").post(
  verifyJWT,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishVideo,
);

router.route("/my-videos").get(verifyJWT, getMyVideos);

router.route("/:videoId").get(verifyJWT, getVideoById);

router.route("/channels/:channelId").get(verifyJWT, getChannelVideos);

router.route("/").get(verifyJWT, getAllVideos);

router.route("/:videoId/publish").patch(verifyJWT, togglePublishStatus);

router.route("/update-video/:videoId").patch(
  verifyJWT,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  updateVideo,
);

router.route("/delete/:videoId").delete(verifyJWT, deleteVideo);

export default router;
