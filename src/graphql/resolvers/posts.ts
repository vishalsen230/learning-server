export default {
    Mutation: {
        addPost: async (_: any, { userId, title, content }: any, { prisma }: any) => {
            try {
                const post = await prisma.post.create({
                    data: {
                        title: title,
                        content: content,
                        author: {
                            connect: {
                                id: parseInt(userId)
                            }
                        }
                    }
                });
                return {
                    code: 200,
                    success: true,
                    message: `Successfully created post for userId ${userId}`,
                    post: post
                }
            } catch(err) {
                return {
                    code: 500,
                    success: false,
                    message: `${err}`,
                    post: null
                }
            }
        }
    }
}