const { gql } = require('apollo-server-express');

export default gql`
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]
        createdAt: String!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        comments: [Comment!]
        createdAt: String!
    }

    type Comment {
        id: ID!
        content: String!
        postId: Int
    }

    type CreateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String
        user: User
    }

    type LoginUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String
        userId: Int
    }

    type AddPostResponse {
        code: Int!
        success: Boolean!
        message: String!
        post: Post
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        userData(userId: ID!): User!
    }

    type Mutation {
        createUser(userInput: UserInputData): CreateUserResponse!
        loginUser(loginInput: LoginInput): LoginUserResponse!

        addPost(userId: ID!, title: String!, content: String!): AddPostResponse!
    }
`;
