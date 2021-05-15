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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../helpers/middlewares/auth.middleware");
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.service = new user_service_1.UserService();
        this.router = express_1.Router();
        this.routes();
    }
    index(res) {
        return res.send('user index');
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = req['body'];
            const resp = yield this.service.login(input, res);
            console.log('req -> ', req['body']);
            return res.send(resp).json();
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req['body'];
            const resp = yield this.service.register(user, res);
            console.log('req -> ', req['body']);
            console.log('register response => ', resp);
            return res.send(resp).json();
        });
    }
    me(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = yield this.service.me();
            res.send(me).json();
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.jid;
            const resp = yield this.service.refreshToken(token, res);
            return res.send(resp).json();
        });
    }
    revokeToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const resp = yield this.service.revokeToken(id);
            res.send(resp).json();
        });
    }
    routes() {
        this.router.get('/', (_, res) => this.index(res));
        this.router.post('/login', (req, res) => this.login(req, res));
        this.router.post('/register', (req, res) => this.register(req, res));
        this.router.post('/me', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (_, res) => this.me(res));
        this.router.post('/refresh_token', (req, res) => this.refreshToken(req, res));
        this.router.post('/revoke_token/:id', (req, res) => this.revokeToken(req, res));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map