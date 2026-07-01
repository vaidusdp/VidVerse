import {Router} from "express";
import {
    getChannelStats,
    getChannelVideos
} from "../controllers/dashboard.controllor.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/channel-stats/:userId").get(verifyJWT, getChannelStats);
router.route("/channel-videos/:userId").get(verifyJWT, getChannelVideos);

export default router;