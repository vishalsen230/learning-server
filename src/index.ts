import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';

import context from './graphql/context';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';


async function startApolloServer(typeDefs: any, resolvers: any) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
        context: context
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve: any) => httpServer.listen({ port: 4000 }, resolve));
    return `http://localhost:4000${server.graphqlPath}`;
}

startApolloServer(typeDefs, resolvers).then(url => {
    console.log(`🚀 Server ready at ${url}`);
});
