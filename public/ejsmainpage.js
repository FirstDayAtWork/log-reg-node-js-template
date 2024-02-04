const someBtn = document.querySelector('.btn');

someBtn.addEventListener('click', () => {
    console.log('hi');
    window.location.assign('http://127.0.0.1:5000/register');
})


