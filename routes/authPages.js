import express from "express";
import {getWelcomePage} from '../controllers/welcomeUser.js'
import { checkRefreshToken } from "../controllers/checkRefresh.js"
import {checkAccessToken} from '../controllers/checkAccess.js'



const authPages = express.Router();



authPages.route('/welcome')
    .get(getWelcomePage)
    .post(checkRefreshToken, checkAccessToken)

// authPages.route('/refresh')
//     .get()











export default authPages