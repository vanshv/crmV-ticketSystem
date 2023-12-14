const { ResetPinSchema } = require('./ResetPin.schema');
const { randomPinNumber } = require('../../utils/randomGenerator');

const setPasswordResetPin = (email) => {
  const pinLength = 6;
  const randPin = randomPinNumber(pinLength);

  //since email var and property have same name, this works as shorthand
  const resetObj = {
    email,
    pin: randPin,
  };

  return new Promise((resolve, reject) => {
    ResetPinSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getPinByEmail = async (email, pin) => {
  try {
    if (!email || !pin) return false;
    const instance = await ResetPinSchema.findOne({ email, pin });
    return instance;
  } catch (error) {
    reject(error);
  }
};

const deletePin = async (email, pin) => {
  try {
    if (!email || !pin) return false;
    const instance = await ResetPinSchema.findOneAndDelete({ email, pin });
    return instance;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setPasswordResetPin,
  getPinByEmail,
  deletePin,
};
