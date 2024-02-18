async function logout(){
    try {
            localStorage.removeItem('access_token');
            return window.location.assign('http://localhost:5000/login');
        } catch (error) {
            console.error(error)
        }
}  

logout()