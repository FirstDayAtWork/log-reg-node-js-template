import { getData } from '../database.js'
import { setRoleCookie } from './roleCookie.js';

const getIndexPage = async (req, res) => {
    // show db data on ejs page
    setRoleCookie(req, res)
    const sqlres = await getData();
    const clientRole = req.cookies['u_role'];
    console.log(sqlres);
    res.render('pages/index', {
        sqlres: sqlres,
        clientRole
    })
}

/* <script defer src=<%= csscript %>></script> */

const getRegisterPage = (req, res) => {
    setRoleCookie(req, res)
    const clientRole = req.cookies['u_role'];
    res.render('pages/register', {
        clientRole
        
    })
}

const getLoginPage = (req, res) => {
    setRoleCookie(req, res)
    const clientRole = req.cookies['u_role'];
    res.render('pages/login', {
        clientRole
        
    })
}


const getDisabledJsPage = (req, res) => {
    setRoleCookie(req, res)
    res.render('pages/disabledjs')
}

export {getIndexPage, getRegisterPage, getLoginPage, getDisabledJsPage}