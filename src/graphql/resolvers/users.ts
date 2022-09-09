const User = require('../../models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {
        async registerUser(_: any, {registerInput}: any, {res}: any) {
            let username = registerInput.username, email = registerInput.email, password = registerInput.password;
            const oldUser = await User.findOne({email});
            if(oldUser) {
                throw new ApolloError('Email is already registered' + email, 'ALREADY_EXIST');
            }
            const salt = await bcrypt.genSalt(10);
            let encryptPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptPassword
            })

            const token = jwt.sign(
                {user_id: newUser._id, email},
                'arun',
                {
                    expiresIn: '2h'
                }
            )

            res.cookie("access-token",token); 
            const resp = await newUser.save();
            
            return {
                id: resp.id,
                ...resp._doc
            }

        },
        async loginUser(_: any, {loginInput}: any, {res}: any) {
            let email = loginInput.email, password = loginInput.password;
            const user = await User.findOne({email});

            if(user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    {user_id: user._id, email},
                    'arun',
                    {
                        expiresIn: '2h'
                    }
                );
                user.token = token;
                res.cookie("access-token",token); 
                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                throw new ApolloError ('Incorrect password', 'INCORRECT_PASSWORD');
            }

        }
    },
    Query: {
        user: (_ : any, {ID} : any ) => User.findByID(ID)
    }
}