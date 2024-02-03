import { getData } from '../database.js'

const getIndexPage = async (req, res) => {
    // show db data on ejs page
    const sqlres = await getData();
    console.log(sqlres);
    res.render('index', {
        sqlres: sqlres
    })
}

const getRegisterPage = (req, res) => {
    res.render('register')
}

const getLoginPage = (req, res) => {
    res.render('login')
}




export {getIndexPage, getRegisterPage, getLoginPage,}