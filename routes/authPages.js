import express from "express";
import {getWelcomePage} from '../controllers/welcomeUser.js'
import {checkAccessToken} from '../controllers/refresh.js'


const authPages = express.Router();



authPages.route(`/welcome`)
    .get(getWelcomePage)


authPages.route('/refresh')
    .get(checkAccessToken)











export default authPages