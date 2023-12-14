const { token } = require('morgan');
const { UserSchema } = require('./User.schema');

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
    if (!email) return false;
    const instance = await UserSchema.findOne({ email });
    return instance;
  } catch (error) {
    //changed promise to await statement
    reject(error);
  }
};

const getUserById = async (_id) => {
  try {
    if (!_id) return false;
    const instance = await UserSchema.findOne({ _id });
    return instance;
  } catch (error) {
    //changed promise to await statement
    reject(error);
  }
};

//this sets refreshJWT, where is this used
const storeUserRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { _id },
        {
          $set: { 'refreshJWT.token': token, 'refreshJWT.addedAt': Date.now() },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const updatePassword = (email, newhashedPass) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { email },
        {
          $set: { password: newhashedPass },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  insertUser,
  getUserByEmail,
  getUserById,
  storeUserRefreshJWT,
  updatePassword,
};
