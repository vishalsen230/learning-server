const userMongoose = require('mongoose');

const Uschema = userMongoose.Schema;

const userSchema = new Uschema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    }
});

module.exports = userMongoose.model('User', userSchema);