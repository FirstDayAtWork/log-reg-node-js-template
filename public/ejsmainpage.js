const someBtn = document.querySelector('.btn');

someBtn.addEventListener('click', () => {
    console.log('hi');
    window.location.assign('http://127.0.0.1:5000/register');
})


const video = document.getElementsByTagName('video');

document.body.addEventListener('click', () => {
    video[0].muted = false;
    console.log('click')
})
