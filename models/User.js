const monogoose = require('mongoose');

const UserSchema = monogoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = monogoose.model('user', UserSchema);
