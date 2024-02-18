const backToThePageBtn = document.querySelector('#back-btn');

backToThePageBtn.addEventListener('click', () => {
     if(localStorage.getItem('access_token') === null){
            console.log('no token here')
            return window.location.assign('http://localhost:5000/login');
        }
        return window.location.assign('http://localhost:5000/welcome');
})