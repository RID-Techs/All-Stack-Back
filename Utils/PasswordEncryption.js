const argon2 = require("argon2");

const argon2Options = {
    type: argon2.argon2id,
    timeCost: 3,
    parallelism: 2,
    hashLength: 64
}

async function HashPassword (password) {
    try {
        const hashPass = await argon2.hash(password, argon2Options);
        return hashPass;
    } catch (error) {
        console.log('Error hashing password:', error);
    }
}

async function VerifyPassword (storedHash, password) {
    try {
        const isValidPass = await argon2.verify(storedHash, password);
        if(!isValidPass) throw new Error("Invalid Password");
        return isValidPass;
    } catch (error) {
        console.log('Error verifying password:', error);
    }
}

module.exports = {HashPassword, VerifyPassword};