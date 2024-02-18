const someBtn = document.querySelector('.btn');

someBtn.addEventListener('click', () => {
    console.log('hi');
    window.location.assign('http://localhost:5000/register');
})


