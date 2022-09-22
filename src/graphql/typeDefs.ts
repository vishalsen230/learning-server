const { gql } = require('apollo-server');

export default gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        token: String!
        posts: [Post!]
        createdAt: String!
    }

    type Post {
        _id: ID!
        description: String!
        title: String!
        creator: User!
        location: String
        createdAt: String!
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

    input PostInput {
        title: String!
        description: String!
        location: String!
    }

    type CreateUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String
        userId: ID
    }

    type LoginUserResponse {
        code: Int!
        success: Boolean!
        message: String!
        token: String
        userId: ID
    }

    type UserPostsResponse {
        code: Int!
        success: Boolean!
        message: String!
        name: String
        posts: [Post!]
    }

    type Query {
        user: User!
        userPosts: UserPostsResponse!
        post(id: ID!): Post!
    }

    type Mutation {
        createUser(userInput: UserInputData): CreateUserResponse!
        loginUser(loginInput: LoginInput): LoginUserResponse!

        createPost(postInput: PostInput): Post!
        deletePost(id: ID!): Boolean
    }
`;
