const userResolvers = require('./users');
const postResolvers = require('./posts');
const commentResolvers = require('./comments');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
        ...commentResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
    },
    Post: {
        likeCount: (parent: any) => parent.likes.length,
        commentCount: (parent: any) => parent.comments.length
    }
};