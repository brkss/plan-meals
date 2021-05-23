"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../entity/User");
const bcrypt = __importStar(require("bcrypt"));
const token_1 = require("../helpers/auth/token");
const sendRefreshToken_1 = require("../helpers/auth/sendRefreshToken");
const httpContext = __importStar(require("express-http-context"));
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
class UserService {
    login(userInput, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('login user data => ', userInput);
            if (!userInput.username || !userInput.password) {
                return {
                    status: false,
                    message: 'invalid username or password'
                };
            }
            try {
                const user = yield User_1.User.findOne({ where: { username: userInput.username } });
                if (!user) {
                    return {
                        status: false,
                        message: 'User not found'
                    };
                }
                const validate = yield bcrypt.compare(userInput.password, user.password);
                if (!validate) {
                    return {
                        status: false,
                        message: 'incorect password'
                    };
                }
                sendRefreshToken_1.sendRefreshToken(res, token_1.createRefreshToken(user));
                return {
                    status: true,
                    accessToken: token_1.createAccessToken(user)
                };
            }
            catch (e) {
                console.log('user login error => ', e);
                return {
                    status: false,
                    message: 'sorry something went wrong!'
                };
            }
        });
    }
    register(userInput, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('user => ', userInput);
            if (!userInput || !userInput.name || !userInput.username || !userInput.password) {
                return {
                    status: false,
                    message: 'please check your information'
                };
            }
            if (userInput.password.length < 3 || userInput.username.length < 3) {
                return {
                    status: false,
                    message: 'Password and username must be gratier than 3 characters'
                };
            }
            try {
                const hashedPassword = yield bcrypt.hash(userInput.password, bcrypt.genSaltSync(10));
                yield User_1.User.insert({
                    name: userInput.name,
                    username: userInput.username,
                    password: hashedPassword
                });
                const user = yield User_1.User.findOne({ where: { username: userInput.username } });
                sendRefreshToken_1.sendRefreshToken(res, token_1.createRefreshToken(user));
                return {
                    status: true,
                    accessToken: token_1.createAccessToken(user)
                };
            }
            catch (e) {
                console.log('inserting user error => ', e);
                if (e.code === 'ER_DUP_ENTRY') {
                    return {
                        status: false,
                        message: 'duplicated username'
                    };
                }
                return {
                    status: false,
                    message: 'something went wrong'
                };
            }
        });
    }
    refreshToken(token, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                return {
                    status: false,
                    accessToken: ''
                };
            }
            let payload = null;
            try {
                payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
            }
            catch (e) {
                console.log('refresh token => ', e);
                return {
                    status: false,
                    accessToken: ''
                };
            }
            const user = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (!user) {
                return {
                    status: false,
                    accessToken: ''
                };
            }
            if (payload.version !== user.tokenVersion) {
                return {
                    status: false,
                    accessToken: ''
                };
            }
            sendRefreshToken_1.sendRefreshToken(res, token_1.createRefreshToken(user));
            return {
                status: true,
                accessToken: token_1.createAccessToken(user)
            };
        });
    }
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                hello: 'hey',
                userId: httpContext.get('userId')
            };
        });
    }
    revokeToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                return {
                    status: false,
                    message: 'user not found'
                };
            }
            yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(User_1.User)
                .set({ tokenVersion: user.tokenVersion + 1 })
                .where("id = :id", { id: user.id }).execute();
            return {
                status: true,
                message: 'token revoked'
            };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map