import {ApolloServer} from '@apollo/server';
import {SectionResolvers, SectionTypes} from "./graphql/section";
import lodash from 'lodash';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import express from "express";
import {expressMiddleware} from "@apollo/server/express4";
import cors from "cors";
import {authContext, generateToken} from "./auth.ts";

const globalTypeDefs = `#graphql
    enum TextbookCost {
        FREE,
        CHEAP,
        MODERATE,
        EXPENSIVE
    }

    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`

export const app = express();

export const httpServer = http.createServer(app);

export const server = new ApolloServer({
    csrfPrevention: false, // TODO: Enable this in production
    introspection: true,
    typeDefs: [globalTypeDefs, SectionTypes],
    resolvers: lodash.merge(SectionResolvers),
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
    ],
});

await server.start();

app.use(cors({ origin: '*' })); // Allow all origins for CORS
app.use(express.json());
app.use(
    '/graphql',
    expressMiddleware(server, {
        context: authContext, // Example context setup
    })
);

app.post('/login', async (req, res) => {
    let token = await generateToken(req.body.username, req.body.password);
    if (!token) {
        res.status(401).send('Invalid credentials');
        return;
    }
    res.json({ token });
});