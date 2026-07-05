import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/auth.route.js";
import videoRoutes from "./routes/video.route.js";
import commentRoutes from "./routes/comment.route.js";
import likeRoutes from "./routes/like.route.js";
import subscriberRoutes from "./routes/subscription.route.js";
import playlistRoutes from "./routes/playlist.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

app.use(cookieParser());

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/subscription", subscriberRoutes);
app.use("/api/v1/playlists", playlistRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

export default app;
