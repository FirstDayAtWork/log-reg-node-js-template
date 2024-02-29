import { dateNow } from '../utils/customLogMsg.js'

const logoutThisUser = (req, res) => {
            const currentDate = dateNow();
            res.clearCookie('refresh_token')
            res.cookie('u_role', 'guest', {httpOnly: true, secure: true})
            console.log(`${currentDate} Logout just happend!`)
            const message = 'LOGOUT!'
            res.render('pages/logout', {
                message
            })
}


export {logoutThisUser}