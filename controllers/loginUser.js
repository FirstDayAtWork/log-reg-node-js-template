import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { getData } from '../database.js'

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
    // Compare pass with hash pass
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid){
        console.log('Wrong Password')
        res.status(402).json('Wrong Password')
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
    // send cookie                            
    res.cookie('access_token', accessToken, {httpOnly: true})
    res.cookie('refresh_token', refreshToken, {httpOnly: true})
    res.status(200).json('OK')
    console.log(`Username ${username} is successfully login!`)
}


export {postLoginPage}