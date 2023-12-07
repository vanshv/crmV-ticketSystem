const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (plainPassword) => {
    // is this even required? 
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saltRounds));
    });
};

module.exports = {
    hashPassword,
};