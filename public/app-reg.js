const formbtn = document.querySelector('.btn');
const formInputs = document.querySelectorAll('.form-inputs');
// http://localhost:2228/register
// const inputs = document.querySelectorAll('.form-inputs');

function keyDownEvents(){
    const REGEXP = regExpDelivery();

    for(let i = 0; i < formInputs.length; i++){

        formInputs[i].addEventListener('input', () => {
            
            let user_err = document.createElement('small');
            if(!REGEXP[i].test(formInputs[i].value)){
                // console.log(formInputs[i].nextElementSibling.nodeName)
                if(formInputs[i].nextElementSibling?.classList.contains('user-err')){
                    formInputs[i].nextElementSibling.remove();
                }
                user_err.classList.add('user-err');
                user_err.innerText = keydownMessages(formInputs[i])[i];
                formInputs[i].style.border = '2px solid #b90909'
                formInputs[i].after(user_err);
                formbtn.disabled = true
                
            } else if(REGEXP[i].test(formInputs[i].value)){
                if(formInputs[i].nextElementSibling?.classList.contains('user-err')){
                    formInputs[i].nextElementSibling.remove();
                }
                    user_err.remove();
                    formInputs[i].style.border = '2px solid #dddddd';
                    formInputs[i].addEventListener('focus', () => formInputs[i].style.border = '2px solid #0941b9');
                    formInputs[i].addEventListener('blur', () => formInputs[i].style.border = '2px solid #dddddd')
                    formbtn.disabled = false
            }
        })
    }
    
    
}

keyDownEvents()

function keydownMessages(inputName){
    let arr = [];
    let username = `${inputName.name.toUpperCase()} must be in range from 5 to 20 characters`;
    let email = `${inputName.name.toUpperCase()} should look like this : example@gmail.com`;
    let password = `Make sure ${inputName.name.toUpperCase()} it\'s at least 8 characters \n including: a lowercase letter, a uppercase letter, \n a number and special character`;
    arr.push(username, email, password);
    return arr
}


const formValues = document.querySelector('form');

formbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const REGEXP = regExpDelivery();

    const formInputs = document.querySelectorAll('.form-inputs');
    const userNameInput = document.querySelector('#username');
    const userEmailInput = document.querySelector('#email');
    const userPassInput = document.querySelector('#password');

      let validation = preValidation(formInputs);

      if(validation.every(el => el === false)){
        const fv = new FormData(formValues);
        const obj = Object.fromEntries(fv);
        const jsonData = JSON.stringify(obj);
        console.log("sending JSON:", jsonData)
        const datafetch = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: jsonData
         });
    
        let result = await datafetch.json();

            

            

        if(datafetch.status === 200) {
                console.log('OK')
                // Return -> main page
        window.location.assign('http://127.0.0.1:5000/');
        } else if(datafetch.status === 409){
            
            let user_err = document.createElement('small');
                    user_err.classList.add('user-err');
                    user_err.innerText = `Username ${userNameInput.value} is already exist`;
                    userNameInput.style.border = '2px solid #b90909'
                    // remove err if already exist
                    if(userNameInput.nextElementSibling.classList.contains('user-err')){
                        userNameInput.nextElementSibling.remove();
                    }

                    userNameInput.after(user_err);
                    setTimeout(() => {
                        user_err.remove();
                        userNameInput.style.border = '2px solid #dddddd';
                        userNameInput.addEventListener('focus', () => userNameInput.style.border = '2px solid #0941b9');
                        userNameInput.addEventListener('blur', () => userNameInput.style.border = '2px solid #dddddd')
                    }, 5000);
            console.log('Username is already exist')
        }
        
      } else {
        console.log('else');
        
        return
      }

        
        // prevalidation logic
        function preValidation(inputsData){
            let arr = [];
            for(let i = 0; i < REGEXP.length; i++){
                arr.push(!REGEXP[i].test([inputsData[i].value]))
                if(!REGEXP[i].test([inputsData[i].value])){
                    let user_err = document.createElement('small');
                    user_err.classList.add('user-err');
                    user_err.innerText = `Invalid ${inputsData[i].name}`;
                    inputsData[i].style.border = '2px solid #b90909'
                    inputsData[i].after(user_err);
                    formbtn.disabled = true

                    setTimeout(() => {
                        user_err.remove();
                        inputsData[i].style.border = '2px solid #dddddd';
                        inputsData[i].addEventListener('focus', () => inputsData[i].style.border = '2px solid #0941b9');
                        inputsData[i].addEventListener('blur', () => inputsData[i].style.border = '2px solid #dddddd')
                        formbtn.disabled = false
                    }, 5000);
                }   
                console.log('Invalid')
            }
            return arr
        }
    

    

})


    // Regexp Logic
    function regExpDelivery(){

        const REGUSER = /^(?=[\w.-]{5,20}$)(?:[\d_.-]*[a-zA-Z]){3}[\w.-]*$/
            // ^ Start of string
            // (?=[\w.-]{5,20}$) Assert 5-20 of the allowed characters
            // (?:[\d_.-]*[a-zA-Z]){3} Match 3 times a-zA-Z followed by optional digits _ . -
            // [\w.-]* Match optional word chars or . or -
            // $ End of string

        const REGMAIL = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
            //  ^ - It is the start of the string.
            // [a-z0-9]+ - Any character between a to z and 0 to 9 at the start of the string.
            // @ - The string should contains ‘@’ character after some alphanumeric characters.
            // [a-z]+ - At least one character between a to z after the ‘@’ character in the string.
            // \. – Email should contain the dot followed by some characters followed by the ‘@’ character
            // [a-z]{2,3}$ - It should contain two or three alphabetical characters at the end of the string. The ‘$’ represents the end of the string.
           
        const REGPASS = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
            // old one : /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9]{6,}$/
            // At least 8 characters long
            // contains a lowercase letter
            // contains an uppercase letter
            // contains a digit
            // containes a special character
        let arr = [REGUSER, REGMAIL, REGPASS];
        
            return arr
        }