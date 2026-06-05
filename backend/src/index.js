import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

let port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("VidVerse streaming on port " + port);
    });
  })
  .catch((error) => {
    console.error("Mongo DB Connection Error: " + error);
    process.exit(1);
  });
