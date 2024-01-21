import bcrypt from 'bcrypt'
import db from '../database.js'
import { getData } from '../database.js'

const getIndexPage = async (req, res) => {
    // show db data on ejs page
    const sqlres = await getData();
    const yourIp = req.socket.remoteAddress
    console.log(sqlres, yourIp);
    res.render('index', {
        sqlres: sqlres,
        yourIp, yourIp
    })
}


const getRegisterPage = (req, res) => {
    res.render('register')
}

const getLoginPage = (req, res) => {
    res.render('login')
}


const postRegisterPage = async (req, res) => {
    const sqlres = await getData();
    let { username, email, password } = req.body;
    let user = sqlres.find(u => u.username === username);
    // return if !user
    if (user){
        console.log('User already exist!')
        res.status(400).json('User already exist!')
        return
    }
    // hash pass with bcrypt, then send it to db
    const hash = await bcrypt.hash(password, 13);
    // insert data to database!!!
    let sql = `INSERT INTO users(username, email, password) VALUES (?,?,?)`;
    db.run(sql, [`${username}`, `${email}`, `${hash}`], 
    (err) => {
    if (err) return console.error(err.message);
    
    // send a cookie && jwt
    let loginresult = 'Success!';
    res.status(200).json('OK')
    console.log('it works!')
    console.log(loginresult)
})
    console.log(req.body)
    console.log(username)
}



// Send login data to server then compare with db data
const postLoginPage = async (req, res) => {
    
    const sqlres = await getData();

    let { username, password } = req.body;
    console.log(username, password);

    let user = sqlres.find(u => u.username === username);
    // return if !user
    if (!user){
        console.log('User doesn\'t exist!')
        res.status(400).json('User doesn\'t exist!')
        return
    }
    // compare pass with hash pass
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid){
        console.log('Wrong Password')
        res.status(402).json('Wrong Password')
        return
    }

    // send a cookie && jwt
    let loginresult = 'Success!';
    res.status(200).json('OK')
    console.log('it works!')
    console.log(loginresult)
    
}

export {getIndexPage, getRegisterPage, getLoginPage, postRegisterPage, postLoginPage}