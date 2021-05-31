const monogoose = require('mongoose');

const ContactSchema = monogoose.Schema({
    user: {
        type: monogoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    type:{
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = monogoose.model('contact', ContactSchema);
