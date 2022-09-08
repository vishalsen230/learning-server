import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server';
import { connectDB } from './db/connect';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app: Application = express();

const PORT = process.env.PORT || 8000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const mongoUrl = 'mongodb+srv://vishal:ggoel@learning.cvbiciu.mongodb.net/?retryWrites=true&w=majority';

connectDB(mongoUrl)
    .then(() => {
        server.listen({ port: PORT });
    })
    .catch((err: any) => console.log(err));
