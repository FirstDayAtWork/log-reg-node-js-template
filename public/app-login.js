const formbtn = document.querySelector('.btn');
// const inputs = document.querySelectorAll('.form-inputs');

const formValues = document.querySelector('form');

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

    

    if(datafetch.status === 200){
        // Return -> main page
        window.location.assign('http://127.0.0.1:5000/welcome');
    } else if(datafetch.status === 400){
        console.log(result)
    } else if(datafetch.status === 402){
        console.log(result)
    }

    } catch (error) {
        console.log(error, 'aaah')
    }
    



    
    

    
})