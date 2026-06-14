import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

app.use(cookieParser());

app.get("/api/v1/home", (req, res) => {
  console.log("Testing Home");
});

// Auth
import userRoutes from "./routes/auth.route.js";
app.use("/api/v1/users", userRoutes);

// Video
import videoRoutes from "./routes/video.route.js";
app.use("/api/v1/videos", videoRoutes);

import commentRoutes from "./routes/comment.route.js"
app.use("/api/v1/comments", commentRoutes);

export default app;
