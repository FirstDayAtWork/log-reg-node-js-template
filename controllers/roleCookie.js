// So we got 3 roles : admin, user, guest
// each role has diff permissions/rights on our site
// if somebody visit our site for the first time, we give him role = guest which is stored in cookies
// if user is loggin on our site, we'll give him role = user
// if user is loggedout - his role will be guest again.

export const setRoleCookie = (req, res) => {
    const checkRoleCookie = req.cookies['u_role'];
    switch (checkRoleCookie) {
        case 'guest':
            console.log('hello guest!')
            break;
        case 'user':
            console.log('hello user!')
            break;
        case 'admin':
            console.log('hello admin!')
            break;
        default:
            console.log('u have no role!')
            res.cookie('u_role', 'guest', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            })
            break;
    }
}


