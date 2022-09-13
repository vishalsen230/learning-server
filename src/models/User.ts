const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
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

export default mongoose.model('User', userSchema);