import 'dotenv/config';
import "reflect-metadata";
import { createConnection } from "typeorm";
import path from 'path';
import express from 'express';
import { controllers } from './controllers/controllers';
import * as httpContext from 'express-http-context';
import cookieParser from 'cookie-parser';
import cors from 'cors';

(async () => {
 
   
    const app = express();
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(cookieParser());

    // db connection 
    await createConnection({ 
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "movproj",
        entities: ["dist/entity/**/*.js"],
        synchronize: true,
    });

    // configure express 
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(httpContext.middleware);
    app.get('/', (_, res) => {
        res.send('hello world');
    }) ;
    app.use(`/user/`, controllers.user.router);
    app.use(`/recipe/`, controllers.recipe.router);
    app.use(`/grocery/`, controllers.grocery.router);

    // cdn
    var dir = path.join(__dirname, 'public');
    app.use(express.static(dir));

    app.listen(4000, () => {
        console.log('server listen ar http://127.0.0.1:4000')
    })


})().catch(e => {
    console.log('main func error => ', e);
});
