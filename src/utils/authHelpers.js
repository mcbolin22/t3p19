const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Compare raw password to encrypted password
async function comparePasswords(plainTextPassword, encryptedPassword) {
    let doesPasswordMatch = false;

    doesPasswordMatch = await bcrypt.compare(plainTextPassword, encryptedPassword);

    return doesPasswordMatch;

}

// Create a JWT
function createJWT(userId) {
    let newJWT = jwt.sign(
        // Payload of data
        {id: userId},

        // Secret key for JWWT signature
        process.env.JWT_KEY,

        // Options for JWT expiry
        {
            expiresIn: "7d"
        },

    );

    return newJWT;

}

// Validate JWT
function validateJWT(jwtToValidate) {
    let isJWTValid = false;

    jwt.verify(jwtToValidate, process.env.JWT_KEY, (error, decodedJWT) => {
        if (error) {
            throw new Error("User JWT is not valid");
        }

        console.log("Decoded JWT data:");
        console.log(decodedJWT);
        isJWTValid = true;
    });

    return isJWTValid;
}

module.exports = {
    comparePasswords,
    createJWT,
    validateJWT
}