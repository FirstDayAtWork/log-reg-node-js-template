import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const getWelcomePage = (req, res) => {
    // let decodedName = jwt.decode(req.cookies['access_token'])

    let msg = `You successfully login!`
    console.log(msg)
    res.render('welcome', {
        msg,
    })
}

export {getWelcomePage}