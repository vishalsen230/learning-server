import User from '../../models/User';
import { ApolloError } from 'apollo-server-errors';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'PRIVATE_KEY';

export default {
    Mutation: {
        async createUser(_: any, { userInput }: any, { res }: any) {
            try {
                let name = userInput.name;
                let email = userInput.email;
                let password = userInput.password;

                const oldUser = await User.findOne({ email });

                if (oldUser) {
                    throw new ApolloError('Email is already registered ' + email, 'ALREADY_EXIST');
                }

                const salt = await bcrypt.genSalt(10);
                let encryptPassword = await bcrypt.hash(password, salt);

                const newUser = new User({
                    name: name,
                    email: email.toLowerCase(),
                    password: encryptPassword,
                    createdAt: new Date().toISOString(),
                });

                const token = jwt.sign({ user_id: newUser._id, email }, PRIVATE_KEY, {
                    expiresIn: '2h',
                });

                const createdUser = await newUser.save();

                return {
                    code: 200,
                    success: true,
                    message: `Successfully created user with userId: ${createdUser._id}`,
                    token,
                    userId: createdUser._id
                };
            } catch (err: any) {
                return {
                    code: 500,
                    success: false,
                    message: `${err}`,
                    userId: null
                }
            }
        },

        async loginUser(_: any, { loginInput }: any, { res }: any) {
            try {
                let email = loginInput.email;
                let password = loginInput.password;

                const user = await User.findOne({ email });
                if (!user) {
                    throw new ApolloError('User does not exist', 'NO_USER_EXIST');
                }

                let isEqual = await bcrypt.compare(password, user.password);
                if (!isEqual) {
                    throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
                }

                const token = jwt.sign({ user_id: user._id, email }, PRIVATE_KEY, {
                    expiresIn: '2h',
                });

                return {
                    code: 200,
                    success: true,
                    message: `User Successfully logged in`,
                    token: token,
                    userId: user._id
                };
            } catch (err: any) {
                return {
                    code: 500,
                    success: false,
                    message: `${err}`
                };
            }
        },
    },
    Query: {
        user: (_: any, { ID }: any) => User.findByID(ID),
    },
};
