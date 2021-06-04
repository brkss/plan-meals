"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const user_input_1 = require("../helpers/inputs/user.input");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_response_1 = require("../helpers/responses/auth.response");
const token_1 = require("../helpers/functions/user/token");
const sendRefreshToken_1 = require("../helpers/functions/user/sendRefreshToken");
const auth_mw_1 = require("../helpers/middlewares/auth.mw");
let UserResolver = class UserResolver {
    hello() {
        return 'hi!!';
    }
    me(ctx) {
        return `user => ${ctx.payload.userId}`;
    }
    login(data, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.identifier) {
                return {
                    status: false,
                    message: 'Invalid Email/Phone'
                };
            }
            if (!data.password) {
                return {
                    status: false,
                    message: 'Invalid password'
                };
            }
            const user = yield User_1.User.findOne({ where: [{ email: data.identifier }, { phone: data.identifier }] });
            if (!user) {
                return {
                    status: false,
                    message: 'Invalid Email/Phone'
                };
            }
            const verify = yield bcrypt_1.default.compare(data.password, user.password);
            if (!verify) {
                return {
                    status: false,
                    message: 'Incorrect password!'
                };
            }
            sendRefreshToken_1.sendRefreshToken(res, token_1.createUserRefreshToken(user));
            return {
                status: true,
                accessToken: token_1.createUserAccessToken(user)
            };
        });
    }
    register(data, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.name || !data.email || !data.phone || !data.password) {
                return {
                    status: false,
                    message: 'invalid data'
                };
            }
            try {
                const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
                yield User_1.User.insert({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: hashedPassword
                });
                const user = yield User_1.User.findOne({ where: { email: data.email } });
                sendRefreshToken_1.sendRefreshToken(res, token_1.createUserRefreshToken(user));
                return {
                    status: true,
                    accessToken: token_1.createUserAccessToken(user)
                };
            }
            catch (e) {
                console.log('error creatin user => ', e);
                if (e.code === "ER_DUP_ENTRY") {
                    return {
                        status: false,
                        message: "Phone or email already exist!"
                    };
                }
                return {
                    status: false,
                    message: 'Something went wrong creating your account!'
                };
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Query(() => String),
    type_graphql_1.UseMiddleware(auth_mw_1.isUserAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => auth_response_1.AuthResponse),
    __param(0, type_graphql_1.Arg('data')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.LoginUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => auth_response_1.AuthResponse),
    __param(0, type_graphql_1.Arg('data')), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.RegisterUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map