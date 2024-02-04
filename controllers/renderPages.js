import { getData } from '../database.js'

const getIndexPage = async (req, res) => {
    // show db data on ejs page
    const sqlres = await getData();
    console.log(sqlres);
    res.render('pages/index', {
        sqlres: sqlres
    })
}

/* <script defer src=<%= csscript %>></script> */

const getRegisterPage = (req, res) => {
    res.render('pages/register')
}

const getLoginPage = (req, res) => {
    res.render('pages/login')
}




export {getIndexPage, getRegisterPage, getLoginPage,}