

const logoutThisUser = (req, res) => {
            res.clearCookie('refresh_token')
            res.cookie('u_role', 'guest', {httpOnly: true})
            console.log('here is logout bruh')
            const message = 'LOGOUT!'
            res.render('pages/logout', {
                message
            })
}


export {logoutThisUser}