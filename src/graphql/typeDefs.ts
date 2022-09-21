const { gql } = require('apollo-server');

export default gql`
    type AuthData {
        token: String!
        userId: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        token: String!
        posts: [Post!]
        createdAt: String!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type Post {
        _id: ID!
        description: String!
        title: String!
        creator: User!
        location: String
        createdAt: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input PostInput {
        title: String!
        description: String!
        location: String!
    }

    type Query {
        user: User!
        userPosts: [Post!]
        post(id: ID!): Post!
    }

    type Mutation {
        createUser(userInput: UserInputData): AuthData!
        loginUser(loginInput: LoginInput): AuthData!

        createPost(postInput: PostInput): Post!
        deletePost(id: ID!): Boolean
    }
`;
