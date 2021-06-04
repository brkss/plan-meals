import 'dotenv/config';
import "reflect-metadata";
import express from 'express';
import {createConnection} from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import { UserResolver } from "./resolvers/user.resolver";
import cookieParser from 'cookie-parser';
import { refreshUserToken } from './helpers/functions/user/refreshToken';
import cors from 'cors';

(async () => {

    
    await createConnection();
    
    const app = express();
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }));
    app.use(cookieParser());

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: true
        }),
        context: ({req, res}) => ({req, res}) 
    });
 
    apolloServer.applyMiddleware({app, cors: false});

    app.get('/', (_, res) => {
        res.send('hello world from express');
    });

    app.post('/refresh_user_token', async (req, res) =>  await refreshUserToken(req, res));

    app.listen(4000, () => {
        console.log('server started at http://127.0.0.1:4000 ');
    })

})(); 
