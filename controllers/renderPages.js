import { getData } from '../database.js'
import jwt from 'jsonwebtoken'
import { setRoleCookie } from './roleCookie.js';

const getIndexPage = async (req, res) => {
    // show db data on ejs page
    setRoleCookie(req, res)
    const decodedJwt = jwt.decode(req.cookies['refresh_token'])
    let userName = decodedJwt?.username;
    const sqlres = await getData();
    const clientRole = req.cookies['u_role'];
    console.log(sqlres);
    res.render('pages/index', {
        sqlres: sqlres,
        userName,
        clientRole
    })
}

/* <script defer src=<%= csscript %>></script> */

const getRegisterPage = (req, res) => {
    setRoleCookie(req, res)
    const decodedJwt = jwt.decode(req.cookies['refresh_token'])
    let userName = decodedJwt?.username;
    const clientRole = req.cookies['u_role'];
    res.render('pages/register', {
        userName,
        clientRole
    })
}

const getLoginPage = (req, res) => {
    setRoleCookie(req, res)
    const decodedJwt = jwt.decode(req.cookies['refresh_token'])
    let userName = decodedJwt?.username;
    const clientRole = req.cookies['u_role'];
    res.render('pages/login', {
        userName,
        clientRole
    })
}


const getDisabledJsPage = (req, res) => {
    setRoleCookie(req, res)
    res.render('pages/disabledjs')
}

export {getIndexPage, getRegisterPage, getLoginPage, getDisabledJsPage}