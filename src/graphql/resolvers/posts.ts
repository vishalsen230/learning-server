import Post from '../../models/Post';
import User from '../../models/User';

import { ApolloError } from 'apollo-server-errors';

export default {
    Mutation: {
        async createPost(_: any, { postInput }: any, { req, res }: any) {
            try {
                let { title, description, location } = postInput;
                if (!req.isAuth) {
                    throw new ApolloError('Not authenticated');
                }

                const user = await User.findById(req.userId);
                if (!user) {
                    throw new ApolloError('Invalid user');
                }

                const post = new Post({
                    title,
                    description,
                    location,
                    creator: user,
                });
                const createdPost = await post.save();
                user.posts.push(createdPost);
                await user.save();

                return {
                    ...createdPost._doc,
                };
            } catch (err: any) {
                throw new ApolloError('Some error occurred', err);
            }
        },
        async deletePost(_: any, { id }: any, { req, res }: any) {
            try {
                if (!req.isAuth) {
                    throw new ApolloError('Not authenticated');
                }

                const post = await Post.findById(id);

                if (!post) {
                    throw new ApolloError('No post found');
                }

                if (post.creator.toString() !== req.userId.toString()) {
                    throw new ApolloError('Not authorised to delete the post');
                }

                await Post.findByIdAndRemove(id);

                const user = await User.findById(req.userId);
                user.posts.pull(id);

                await user.save();

                return true;
            } catch (err: any) {
                throw new ApolloError('Some error occurred', err);
            }
        },
    },
    Query: {
        userPosts: async function (_: any, __: any, { req, res }: any) {
            try {
                if (!req.isAuth) {
                    throw new ApolloError('Not authenticated');
                }

                const postsInfo = await User.findById(req.userId).populate('posts');
                console.log(`postsInfo: ${postsInfo}`);
                return {
                    code: 200,
                    success: true,
                    message: `Successfully fetched user's post`,
                    name: postsInfo.name ,
                    posts: postsInfo.posts
                }
            } catch (err: any) {
                return {
                    code: 500,
                    success: false,
                    message: `${err}`
                }
            }
        },
        post: async function (_: any, { id }: any, { req, res }: any) {
            try {
                if (!req.isAuth) {
                    throw new ApolloError('Not authenticated');
                }
                const post = await Post.findById(id);
                if (!post) {
                    throw new ApolloError('Post not found');
                }
                return post;
            } catch (err: any) {
                throw new ApolloError('Some error occurred', err);
            }
        },
    },
};
