import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const checkAccessToken = (req, res) => {
    // get acces token from coockies
    const get_access_token = req.cookies['access_token'];
    // verify it (check if token is expired)
    jwt.verify(get_access_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(406).json({ message: decoded.username });
        }
        // if yes, generate new
        // generate acc jwt token
        const accessToken = jwt.sign({"username": username}, 
                                process.env.ACCESS_TOKEN_SECRET,
                                {expiresIn: '30s'})
        // generate ref jwt token
        const refreshToken = jwt.sign({"username": username}, 
                                process.env.REFRESH_TOKEN_SECRET,
                                {expiresIn: '1d'})
    })
}



export {checkAccessToken}