import express from "express";
import {getIndexPage, getRegisterPage, getLoginPage, postRegisterPage, postLoginPage} from '../controllers/basicRequests.js'

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