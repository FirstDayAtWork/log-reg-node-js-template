import { getData } from '../database.js'

const getIndexPage = async (req, res) => {
    // show db data on ejs page
    const sqlres = await getData();
    const yourIp = req.socket.remoteAddress
    console.log(sqlres, yourIp);
    res.render('index', {
        sqlres: sqlres,
        yourIp
    })
}

const getRegisterPage = (req, res) => {
    res.render('register')
}

const getLoginPage = (req, res) => {
    res.render('login')
}




export {getIndexPage, getRegisterPage, getLoginPage,}