

const testLoginInputs = (username, password) => {
    // Check if username already exist
    const user = /^(?=[\w.-]{5,20}$)(?:[\d_.-]*[a-zA-Z]){3}[\w.-]*$/.test(username);
    // Compare pass with hash pass
    const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,72}$/.test(password);
    const validInputs = user && isValid
    return validInputs
}

export {testLoginInputs}