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
        friends: [Friendship!]
        createdAt: String!
        updatedAt: String!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type Post {
        _id: ID!
        content: String!
        creator: User!
        comments: [Comment!]
        reactions: [Reaction!]
        createdAt: String!
        updatedAt: String!
    }

    type Comment {
        _id: ID!
        content: String!
        creator: User!
        post: Post!
        createdAt: String!
        updatedAt: String!
    }

    type Reaction {
        _id: ID!
        type: String!
        post: Post!
        user: User!
    }

    type Friendship {
        _id: ID!
        source: User!
        target: User!
        status: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        post(id: ID!): Post!
        comment(id: ID!): Comment!
        reaction(id: ID!): Reaction!
        user: User!
    }

    type Mutation {
        createUser(userInput: UserInputData): User!
        loginUser(loginInput: LoginInput): AuthData!

        createPost(content: String!): Post!
        createComment(text: String!): Comment!

        updatePost(id: ID!, content: String!): Post!
        updateFriendship(id: ID!, status: String!): Friendship!

        deletePost(id: ID!): Boolean
        deleteReaction(id: ID!): Boolean
        deleteFriendship(id: ID!): Boolean
    }
`;
