const postMongoose = require('mongoose');

const Pschema = postMongoose.Schema;

const postSchema = new Pschema({
  description: String,
  title: String,
  location: String,
  username: String,
  createdAt: String,
  comments: [
    {
      description: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Pschema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = postMongoose.model('Post', postSchema);