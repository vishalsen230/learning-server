import userResolvers from './users';
import postResolvers from './posts';

export default {
    Query: {
        ...userResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation
    },

    Post: {
        author: ({ id }: any, _: any, { prisma }: any) => {
            return prisma.post.findUnique({
                where: {
                    id: id
                }
            }).author();
        },
        comments: ({ id }: any, _: any, { prisma }: any) => {
            return prisma.post.findUnique({
                where: {
                    id: id
                }
            }).comments();
        }
    }
};