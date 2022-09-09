const resolvers = {
    Query: {
        example: () => {
            return { name: 'vishal' };
        },
    },
    Mutation: {
        createUser: (_arg: any, user: any) => {
            return user
        },
    },
};

export default resolvers;
