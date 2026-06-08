import express from "express";
import cors from "cors";

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

app.get("/api/v1/home", (req, res) => {
  console.log("Testing Home");
});

// Auth
import userRoutes from "./routes/auth.route.js";
app.use("/api/v1/users", userRoutes);

export default app;
