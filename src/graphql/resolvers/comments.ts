const postComm = require('../../models/Post');
const checkAuthC = require('../../middleware/authentication');

module.exports = {
  Mutation: {
    createComment: async (_: any, { postId, body }: any, context: any) => {
      const { username } = checkAuthC(context);
      if (body.trim() === '') {
        throw new Error('Empty comment');
      }
      const post = await postComm.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new Error('Post not found');
    },
  }
};