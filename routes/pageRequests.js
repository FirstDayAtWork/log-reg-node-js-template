import express from "express";
import {getIndexPage, getRegisterPage, getLoginPage} from '../controllers/renderPages.js'
import {postRegisterPage} from '../controllers/registerUser.js'
import {postLoginPage} from '../controllers/loginUser.js'

const pageRequests = express.Router();

// Navigation
pageRequests.route('')
    .get(getIndexPage)

pageRequests.route('/register')
    .get(getRegisterPage)
    .post(postRegisterPage)

pageRequests.route('/login')
    .get(getLoginPage)
    .post(postLoginPage)


export default pageRequests