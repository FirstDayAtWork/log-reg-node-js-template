import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import 'dotenv/config'


const checkRefreshToken = (req, res, next) => {
    // check refresh token
    const refTokenfromCookie = req.cookies['refresh_token'];
    if (!refTokenfromCookie) {
        console.log("There is no refresh token, LOGOUT!")
        res.status(403).json("No Refresh Token, LOGOUT!")
        return
    }
    // verify refresh token
    jwt.verify(refTokenfromCookie, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json("Expired refresh token, LOGOUT!")
            return
        } else {
            console.log('next ?')
            next()
        }
    })
}

export {checkRefreshToken}