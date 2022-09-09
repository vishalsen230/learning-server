import express, { Request, Response, Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const mongoose = require('mongoose');

const app: Application = express();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req, res}: any) => {
        return ({req, res})},
    });

    await server.start();
  
    server.applyMiddleware({ app });

    const mongoUrl = 'mongodb+srv://arunchaudhary:arunchaudhary@socialmedia.gni8szb.mongodb.net/?retryWrites=true&w=majority';
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true
        });
        console.log('Connection established successfully');
    }catch {
        throw new Error ;
    }
  
    app.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
    );
};
  
  startServer();
