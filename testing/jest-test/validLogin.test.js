import { expect, test } from 'vitest'
import { testLoginInputs } from "../functions/login_test.js";

const validateLoginTest = testLoginInputs;
console.log(validateLoginTest)
test('returns false if user doesnt exist', () => {
    expect(validateLoginTest("", "")).toBe(false)
})

test('returns false if password is wrong', () => {
    expect(validateLoginTest("Michael", "qwe")).toBe(false)
})

test('returns true if username & pass is ok', () => {
    expect(validateLoginTest("Michael", "qweQWE123!")).toBe(true)
})

test('returns false if wrong username or password', () => {
    expect(validateLoginTest("Cock", "twtwetw23")).toBe(false)
})

// npm run test