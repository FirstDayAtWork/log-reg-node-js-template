


async function getTokens(){
    try {
        const lc_token = JSON.stringify({'access_token': localStorage.getItem('access_token')})
        const datafetch = await fetch('/welcome', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: lc_token
     });

        let result = await datafetch.json();
        console.log(result)

        if(datafetch.status === 202){
            localStorage.setItem('access_token', datafetch.headers.get('authorization').split(' ')[1])
            console.log('set new access token from the front')
        } else if(datafetch.status === 403){
            localStorage.removeItem('access_token');
            console.log('there is no access or refresh token')
            return window.location.assign('http://localhost:5000/login');
        }
    } catch (error) {
        console.error(error)
    }
    

}  

getTokens()