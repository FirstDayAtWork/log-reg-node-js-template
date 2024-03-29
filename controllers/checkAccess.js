import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { dateNow } from '../utils/customLogMsg.js'

const checkAccessToken = (req, res) => {
    // get lc token from front
    const lc_token = req.body;
    const currentDate = dateNow();
    if(!lc_token || lc_token['access_token'] === null){
        res.clearCookie('refresh_token')
        console.log(`${currentDate} There is no access token, LOGOUT!`)
        res.cookie('u_role', 'guest', {httpOnly: true, secure: true, sameSite: 'lax'})
        res.status(403).json("No access token, LOGOUT!")
        return
    }
    // get acces token from local storage
    // const get_access_token = req.cookies['refresh_token'];
    // verify it (check if token is expired)
       jwt.verify(lc_token['access_token'], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // if token is expired ? generate new pair access + refresh
                const decodedJwt = jwt.decode(lc_token['access_token'])
                console.log(decodedJwt.username, "checkaccess")
                // generate acc jwt token
                const accessToken = jwt.sign({"username": decodedJwt.username}, 
                                        process.env.ACCESS_TOKEN_SECRET,
                                        {expiresIn: '30s'})
                // generate ref jwt token
                const refreshToken = jwt.sign({"username": decodedJwt.username}, 
                                        process.env.REFRESH_TOKEN_SECRET,
                                        {expiresIn: '1d'})
                res.setHeader('authorization', 'Bearer ' + accessToken)
                res.cookie('refresh_token', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 86400e3,
                    sameSite: 'lax'
                })
                console.log(`${currentDate} Expired access token`)
                res.cookie('u_role', 'user', {httpOnly: true, secure: true, sameSite: 'lax'})
                res.status(202).json("Send new tokens")
            } else {
                // send ok if not
                console.log(`${currentDate} Access Token is OK`)
                res.cookie('u_role', 'user', {httpOnly: true, secure: true, sameSite: 'lax'})
                res.status(200).json('OK this is fine')  
            }
            
        })
}

export {checkAccessToken}