const mongoose = require('mongoose');

const connectDB = (url: String) => {
    return mongoose.connect(url);
}

export { connectDB };