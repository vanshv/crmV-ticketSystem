const jwt = require('jsonwebtoken');

const createAccessJWT = (payload) => {
    const accessJWT = jwt.sign({payload}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });

    return Promise.resolve(accessJWT);
};

const createRefreshJWT = (payload) => {
    const refreshJWT = jwt.sign({payload}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });

    return Promise.resolve(refreshJWT);
};


module.exports = {
    createRefreshJWT,
    createAccessJWT,
}