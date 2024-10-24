import { genSalt, hash, compare } from "bcrypt"
import { v4 as uuidv4 } from "uuid"

/**
 * 
 * Hashes a password.
 * 
 * @param {String} password
 * @returns {String} hashedPassword
 */
async function hashPassword(password) {
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
}

/**
 * 
 * Compares a password with a hashed password and returns a boolean.
 * 
 * @param {String} password
 * @param {String} hashedPassword
 * @returns {Boolean} result
*/
async function comparePassword(password, hashedPassword) {
    const result = await compare(password, hashedPassword)
    return result
}

/**
 * 
 * Generates a random token.
 * 
 * @returns {String} token
 */
function generateToken() {
    return uuidv4()
}

export {
    hashPassword,
    comparePassword,
    generateToken
}