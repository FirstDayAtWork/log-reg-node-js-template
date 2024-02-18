import 'dotenv/config'
import jwt from 'jsonwebtoken'

const getWelcomePage = (req, res) => {
    // req jwt cookie
    const decodedJwt = jwt.decode(req.cookies['refresh_token'])
    let userName = decodedJwt?.username;
    let msg = `You successfully login as ${userName}!`
    const clientRole = req.cookies['u_role'];
    console.log(msg)
    res.render('pages/u/welcome', {
        userName,
        msg,
        clientRole
    })
}

export {getWelcomePage}