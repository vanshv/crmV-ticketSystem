const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    required: true,
  },
  company: {
    type: String,
    maxlength: 30,
    required: true,
  },
  address: {
    type: String,
    maxlength: 100,
  },
  phone: {
    type: Number,
    maxlength: 11,
    required: true,
  },
  email: {
    type: String,
    maxlength: 30,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    //hashing invalidates this?

    required: true,
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: '',
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
});

module.exports = {
  UserSchema: mongoose.model('User', UserSchema),
};
