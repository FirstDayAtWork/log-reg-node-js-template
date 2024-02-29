import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { getData } from '../database.js'
import { dateNow } from '../utils/customLogMsg.js'

// Send login data to server then compare with db data
const postLoginPage = async (req, res) => {
    const yourIp = req.socket.remoteAddress;
    const currentDate = dateNow();
    const sqlres = await getData();
    let { username, password } = req.body;
    console.log(username, password);
    let user = sqlres.find(u => u.username === username);
    // return if !user
    if (!user){
        console.log(`${currentDate} User doesn\'t exist!`)
        res.status(401).json('Invalid username or password.')
        return
    }
    // Compare pass with hash pass
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid){
        console.log(`${currentDate} Wrong Password`)
        res.status(401).json('Invalid username or password.')
        return
    }
    // Send a cookie && jwt

    // generate acc jwt token
    const accessToken = jwt.sign({"username": username}, 
                                process.env.ACCESS_TOKEN_SECRET,
                                {expiresIn: '30s'})
    // generate ref jwt token
    const refreshToken = jwt.sign({"username": username}, 
                                process.env.REFRESH_TOKEN_SECRET,
                                {expiresIn: '1d'})
    // send cookie w/ access & refresh tokens                   
    res.setHeader('authorization', 'Bearer ' + accessToken)
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 86400e3,
        sameSite: 'lax'
        })
    res.cookie('u_role', 'user', {httpOnly: true, secure: true, sameSite: 'lax'})
    res.status(200).json('OK')
    console.log(`${currentDate} Username ${username} is successfully login!`)
}




export {postLoginPage}