"use strict"
const formbtn = document.querySelector('.btn');
const formInputs = document.querySelectorAll('.form-inputs');
const formValues = document.querySelector('form');

function keyDownEvents(){
    formbtn.disabled = true;
    for(let elem of formInputs){
        elem.addEventListener('input', () => {
            if(elem.value.length < 1){
                formbtn.disabled = true
                return
            } 
                formbtn.disabled = false
        })
        
    }
 
}

keyDownEvents()

formbtn.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
    const fv = new FormData(formValues);
    const obj = Object.fromEntries(fv);
    const jsonData = JSON.stringify(obj);
    const datafetch = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: jsonData
     });

     console.log(jsonData)
     
    let result = await datafetch.json();

    if(datafetch.ok){
        // get token from headers then send it to the local storage
         // read headers -> datafetch.headers.get('access_token')
            localStorage.setItem('access_token', datafetch.headers.get('authorization').split(' ')[1])
        // Return -> main page
            window.location.assign('http://localhost:5000/welcome');

    } else if(datafetch.status === 401){
        const inputsContainer = document.querySelector('.inputs-container');
            let user_err = document.createElement('small');
                user_err.classList.add('big-user-err');
                user_err.innerText = `Invalid username or password.`;
                // remove err if already exist
                if(inputsContainer.firstChild.classList?.contains('big-user-err')){
                    inputsContainer.firstChild.remove();
                }
                inputsContainer.prepend(user_err);

                setTimeout(() => {
                    user_err.remove();
                }, 5000);

        console.log(result)
    }

    } catch (error) {
        console.log(error, 'aaah')
    }

})