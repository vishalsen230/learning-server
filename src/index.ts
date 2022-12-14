import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDB } from './db/connect';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const auth = require('./middleware/auth');

const PORT = 8000;

const app: Application = express();

const mongoUrl = 'mongodb+srv://vishal:ggoel@learning.cvbiciu.mongodb.net/?retryWrites=true&w=majority';

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }: any) => {
            const { request, response } = auth(req, res);
            return { req: request, res: response };
        },
    });

    await server.start();

    server.applyMiddleware({ app });

    try {
        await connectDB(mongoUrl);
        console.log('Connection established successfully');
    } catch (err: any) {
        console.log('Error in db connection', err);
    }

    app.listen({ port: PORT }, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`));
};

startServer();
