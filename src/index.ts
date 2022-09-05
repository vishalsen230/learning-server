import express, { Request, Response, Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { connectDB } from './db/connect';
import graphqlSchema from './graphql/schema';
const graphqlResolver = require('./graphql/resolvers');

const app: Application = express();

const PORT = process.env.PORT || 8000;

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
    })
);

// Add mongo url here
const mongoUrl = '';

connectDB(mongoUrl)
    .then(() => {
        app.listen(PORT, (): void => {
            console.log(`Running a GraphQL API server at ${PORT}`);
        });
    })
    .catch((err: any) => console.log(err));
