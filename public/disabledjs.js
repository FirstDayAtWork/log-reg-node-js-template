const backToThePageBtn = document.querySelector('#back-btn');

backToThePageBtn.addEventListener('click', () => {
     if(localStorage.getItem('access_token') === null){
            console.log('no token here')
            return window.location.assign('http://127.0.0.1:5000/login');
        }
        return window.location.assign('http://127.0.0.1:5000/welcome');
})