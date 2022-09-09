const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    }
    // posts: [
    //     {
    //         type: Schema.type.ObjectId,
    //         ref: 'Post',
    //     },
    // ],
    // friends: [
    //     {
    //         type: Schema.type.ObjectId,
    //         ref: 'Friendship',
    //     },
    // ],
});

module.exports = mongoose.model('User', userSchema);