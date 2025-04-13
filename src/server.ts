import {ApolloServer} from '@apollo/server';
import {SectionResolvers, SectionTypes} from "./entities/section";
import lodash from 'lodash';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import express from "express";
import {expressMiddleware} from "@apollo/server/express4";
import cors from "cors";
import {authContext, generateToken} from "./auth.ts";
import {resolvers, typeDefs} from "./entities";
import {SubmissionResolvers} from "./entities/submission";
import {submissionRouter} from "./entities/submission/express.ts";



export const app = express();

export const httpServer = http.createServer(app);

export const server = new ApolloServer({
    csrfPrevention: false, // TODO: Enable this in production
    introspection: true,
    typeDefs,
    resolvers,
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
app.use('/submissions', submissionRouter);

app.post('/login', async (req, res) => {
    let token = await generateToken(req.body.username, req.body.password);
    if (!token) {
        res.status(401).send('Invalid credentials');
        return;
    }
    res.json({ token });
});