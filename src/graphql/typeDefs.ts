const { gql } = require('apollo-server');

module.exports = gql`
type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
    createdAt: String!
}

type Post {
    id: ID!
    username: String!
    description: String!
    title: String!
    location: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
}

type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
}

type Like {
    id: ID!
    createdAt: String!
    username: String!
}

input RegisterInput {
    username: String!
    password: String!
    email: String!
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
    user(id: ID!): User
    getPosts: [Post]
    getPostByID(postID: ID!): Post
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    createPost(postInput: PostInput): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    likePost(postId: ID!): Post!
}
`
