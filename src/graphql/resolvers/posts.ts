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
                let data = {
                    ...createdPost._doc,
                };
                console.log('data', data);
                return data;
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
                return postsInfo.posts;
            } catch (err: any) {
                throw new ApolloError('Some error occurred', err);
            }
        },
        post: async function (_: any, { id }: any, { req, res }: any) {
            try {
                if (!req.isAuth) {
                    throw new ApolloError('Not authenticated');
                }
                console.log('postId', id);
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
