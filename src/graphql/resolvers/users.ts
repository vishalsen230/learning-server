import { ApolloError } from 'apollo-server-errors';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'PRIVATE_KEY';

export default {
    Mutation: {
        createUser: async (_: any, { userInput }: any, { prisma }: any) => {
            try {
                const name = userInput.name;
                const email = userInput.email;
                const password = userInput.password;

                const alreadyRegisteredUser = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                });
                if (alreadyRegisteredUser) {
                    throw new ApolloError(`User is already registered with email: ${email}`, `ALREADY_EXIST`);
                }

                const salt = await bcrypt.genSalt(10);
                const encryptPassword = await bcrypt.hash(password, salt);
                const newUser = await prisma.user.create({
                    data: {
                        name: name,
                        email: email.toLowerCase(),
                        password: encryptPassword
                    }
                });
                const token = jwt.sign({ user_id: newUser.id, email }, PRIVATE_KEY, {
                    expiresIn: '2h',
                });
                return {
                    code: 200,
                    success: true,
                    message: `Successfully created user with userId: ${newUser.id}`,
                    token,
                    user: newUser
                };
            } catch(err) {
                return {
                    code: 500,
                    success: false,
                    message: `${err}`,
                    user: null
                }
            }
        },

        loginUser: async (_: any, { loginInput }: any, { prisma }: any) => {
            try {
                const email = loginInput.email;
                const password = loginInput.password;

                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                });
                if (!user) {
                    throw new ApolloError('User does not exist', 'NO_USER_EXIST');
                }

                let isEqual = await bcrypt.compare(password, user.password);
                if (!isEqual) {
                    throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
                }

                const token = jwt.sign({ user_id: user.id, email }, PRIVATE_KEY, {
                    expiresIn: '2h',
                });

                return {
                    code: 200,
                    success: true,
                    message: `User Successfully logged in`,
                    token: token,
                    userId: user.id
                };
            } catch(err) {
                return {
                    code: 500,
                    success: false,
                    message: `${err}`
                };
            }
        },
    },

    Query: {
        userData: (_: any, { userId }: any, { prisma }: any) => {
            return prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                },
                include: {
                    posts: true
                }
            });
        }
    }
};