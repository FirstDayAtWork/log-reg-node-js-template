import express from "express"
import { logoutThisUser } from "../controllers/logoutUser.js"

const logout = express.Router();

// Navigation
logout.route('/logout')
    .get(logoutThisUser)


export default logout