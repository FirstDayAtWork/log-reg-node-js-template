// server validtaion

export function validationLogic(inputData, REGEXP){
    let arr = [];

    for(let [key, value] of Object.entries(inputData)){
        arr.push(!REGEXP.get(key).test(value))
    }

    return arr
}


// Regexp Logic
export function regExpDelivery(){
const REGEXP = new Map();

REGEXP.set('username', /^(?=[\w.-]{5,20}$)(?:[\d_.-]*[a-zA-Z]){3}[\w.-]*$/)
    // ^ Start of string
    // (?=[\w.-]{5,20}$) Assert 5-20 of the allowed characters
    // (?:[\d_.-]*[a-zA-Z]){3} Match 3 times a-zA-Z followed by optional digits _ . -
    // [\w.-]* Match optional word chars or . or -
    // $ End of string
.set('email', /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)
    //  ^ - It is the start of the string.
    // [a-z0-9]+ - Any character between a to z and 0 to 9 at the start of the string.
    // @ - The string should contains ‘@’ character after some alphanumeric characters.
    // [a-z]+ - At least one character between a to z after the ‘@’ character in the string.
    // \. – Email should contain the dot followed by some characters followed by the ‘@’ character
    // [a-z]{2,3}$ - It should contain two or three alphabetical characters at the end of the string. The ‘$’ represents the end of the string.
.set('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,72}$/)
    // old one : /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9]{6,}$/
    // At least 8 characters long
    // contains a lowercase letter
    // contains an uppercase letter
    // contains a digit
    // containes a special character

    return REGEXP
}