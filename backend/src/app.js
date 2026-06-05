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
    allowedHeaders: ["Authorization", "Cpntent-Type"],
  }),
);

app.get("/", (req, res) => {
  console.log("Testing Home");
});

app.get("/farzi", (req, res) => {
  console.log("Testing Farzi");
});

export default app;
