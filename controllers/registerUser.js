import bcrypt from 'bcrypt'
import db from '../database.js'
import { getData } from '../database.js'


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





export {postRegisterPage}