import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: "./.env"
})

let port = process.env.PORT;
app.listen(port, () => {
    console.log("VidVerse streaming on port " + port);
})
