// Function to encrypt data
const crypto = require("crypto");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const encrypt = (data) => {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
};

const decrypt = (encryptedData) => {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
};

module.exports = { encrypt, decrypt };