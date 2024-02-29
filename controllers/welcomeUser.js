import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { dateNow } from '../utils/customLogMsg.js'

const getWelcomePage = (req, res) => {
    const currentDate = dateNow();
    // req jwt cookie
    const decodedJwt = jwt.decode(req.cookies['refresh_token'])
    let userName = decodedJwt?.username;
    let msg = `You successfully login as ${userName}!`
    const clientRole = req.cookies['u_role'];
    console.log(`${currentDate} ${msg}`)
    res.render('pages/u/welcome', {
        userName,
        msg,
        clientRole
    })
}

export {getWelcomePage}