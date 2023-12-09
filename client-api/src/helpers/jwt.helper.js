const jwt = require('jsonwebtoken');
const {setJWT, getJWT} = require('./redis.helper');
const {storeUserRefreshJWT} = require('../model/user/User.model');

const createAccessJWT = async (email, id) => {
    try{
        const accessJWT = jwt.sign({email}, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '15m',
        });

        await setJWT(accessJWT, id);
        return Promise.resolve(accessJWT);
    }
    catch(error){
        return Promise.reject(error);
    }
};

//i don't think this is called
const createRefreshJWT = async (email, _id) => {
    try{
        const refreshJWT = jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });
        
        await storeUserRefreshJWT(_id, refreshJWT);
        return Promise.resolve(refreshJWT);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

//where are these used?
const verifyAccessJWT = (userJWT) => {
    try{
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
    }
    catch(error){
        return Promise.reject(error);
    }
};

const verifyRefreshJWT = (userJWT) => {
    try{
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
    }
    catch(error){
        return Promise.reject(error);
    }
};


module.exports = {
    createRefreshJWT,
    createAccessJWT,
    verifyAccessJWT,
    verifyRefreshJWT,
}