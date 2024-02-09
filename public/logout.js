async function logout(){
    try {
            localStorage.removeItem('access_token');
            return window.location.assign('http://127.0.0.1:5000/login');
        } catch (error) {
            console.error(error)
        }
}  

logout()