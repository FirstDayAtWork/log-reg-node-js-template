import express from "express"
import { addVideoPath } from "../controllers/noscript.js"

const streamVideo = express.Router();

// Navigation
streamVideo.route('/video')
    .get(addVideoPath)



export default streamVideo