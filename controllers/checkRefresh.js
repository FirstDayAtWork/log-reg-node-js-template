import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { dateNow } from '../utils/customLogMsg.js'

const checkRefreshToken = (req, res, next) => {
    // check refresh token
    const currentDate = dateNow();
    const refTokenfromCookie = req?.cookies['refresh_token'];
    if (!refTokenfromCookie) {
        console.log(`${currentDate} There is no refresh token, LOGOUT!`)
        res.cookie('u_role', 'guest', {httpOnly: true, secure: true, sameSite: 'lax'})
        res.status(403).json("No Refresh Token, LOGOUT!")
        return
    }
    // verify refresh token
    jwt.verify(refTokenfromCookie, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(`${currentDate} Expired refresh token`)
            res.clearCookie('refresh_token')
            res.cookie('u_role', 'guest', {httpOnly: true, secure: true, sameSite: 'lax'})
            res.status(403).json("Expired refresh token, LOGOUT!")
            return
        } else {
            console.log(`${currentDate} Refresh Token is OK, next() check Access ->`)
            next()
        }
    })
}

export {checkRefreshToken}