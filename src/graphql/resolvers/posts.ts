const Post = require('../../models/Post');
const checkAuthP = require('../../middleware/authentication');

module.exports = {
    Mutation: {
        async createPost(_: any, {postInput}: any, context: any) {
            let title = postInput.title, description = postInput.description, location = postInput.location;
            const user = checkAuthP(context);
            console.log(user);
    
            if (description.trim() === '') {
                throw new Error('Post description must not be empty');
            }
    
            const newPost = new Post({
                title,
                description,
                location,
                user: user.user_id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
    
            const post = await newPost.save();
        
            // context.pubsub.publish('NEW_POST', {
            //     newPost: post
            // });
            console.log(post);
            return post;
        },
        async deletePost(_: any, { postId }: any, context: any) {
            const user = checkAuthP(context);
      
            try {
              const post = await Post.findById(postId);
              if (user.username === post.username) {
                await post.delete();
                return 'Post deleted successfully';
              } else {
                throw new Error('Action not allowed');
              }
            } catch (err: any) {
              throw new Error(err);
            }
          },
          async likePost(_: any, { postId }: any, context: any) {
            const { username } = checkAuthP(context);
      
            const post = await Post.findById(postId);
            if (post) {
              if (post.likes.find((like: any) => like.username === username)) {
                post.likes = post.likes.filter((like: any) => like.username !== username);
              } else {
                post.likes.push({
                  username,
                  createdAt: new Date().toISOString()
                });
              }
      
              await post.save();
              return post;
            } else throw new Error('Post not found');
        }
    },
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err: any) {
                throw new Error(err);
            }
        },
        async getPostByID(_: any, { postId } : any) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err: any) {
                throw new Error(err);
            }
        }
    },
}