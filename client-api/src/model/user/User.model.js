const {UserSchema} = require('./User.schema')

const insertUser = (userObj) => {
    return new Promise((resolve, reject) => {
        UserSchema(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
};

const getUserByEmail = async (email) => {
    try {
        if(!email) return false;
        const instance = await UserSchema.findOne({email});
        return instance;
    }
    //change promise to await statement
    catch(error){
        reject(error);
    }
};

module.exports = {
    insertUser,
    getUserByEmail,
};