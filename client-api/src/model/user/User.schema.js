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
        required: true,
    },
});

module.exports = {
    UserSchema: mongoose.model('User', UserSchema),
}