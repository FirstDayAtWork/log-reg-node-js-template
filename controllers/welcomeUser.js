import 'dotenv/config'
import jwt from 'jsonwebtoken'

const getWelcomePage = (req, res) => {
    // req jwt cookie
    const decodedJwt = jwt.decode(req.cookies['refresh_token'])
    let msg = `You successfully login as ${decodedJwt?.username}!`
    const clientRole = req.cookies['u_role'];
    console.log(msg)
    res.render('pages/welcome', {
        msg,
        clientRole
    })
}

export {getWelcomePage}