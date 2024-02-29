import { dateNow } from '../utils/customLogMsg.js'

// So we got 3 roles : admin, user, guest
// each role has diff permissions/rights on our site
// if somebody visit our site for the first time, we give him role = guest which is stored in cookies
// if user is loggin on our site, we'll give him role = user
// if user is loggedout - his role will be guest again.

export const setRoleCookie = (req, res) => {
    const currentDate = dateNow();
    const checkRoleCookie = req.cookies['u_role'];
    switch (checkRoleCookie) {
        case 'guest':
            console.log(`${currentDate} hello guest!`)
            break;
        case 'user':
            console.log(`${currentDate} hello user!`)
            break;
        case 'admin':
            console.log(`${currentDate} hello admin!`)
            break;
        default:
            console.log(`${currentDate} u have no role!`)
            res.cookie('u_role', 'guest', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            })
            break;
    }
}


