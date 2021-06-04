"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_resolver_1 = require("./resolvers/user.resolver");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const refreshToken_1 = require("./helpers/functions/user/refreshToken");
const cors_1 = __importDefault(require("cors"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    const app = express_1.default();
    app.use(cors_1.default({
        credentials: true,
        origin: 'http://localhost:3000'
    }));
    app.use(cookie_parser_1.default());
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [user_resolver_1.UserResolver],
            validate: true
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.get('/', (_, res) => {
        res.send('hello world from express');
    });
    app.post('/refresh_user_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield refreshToken_1.refreshUserToken(req, res); }));
    app.listen(4000, () => {
        console.log('server started at http://127.0.0.1:4000 ');
    });
}))();
//# sourceMappingURL=index.js.map