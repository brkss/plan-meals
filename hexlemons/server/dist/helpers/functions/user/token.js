"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRefreshToken = exports.createUserAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createUserAccessToken = (user) => {
    const token = jsonwebtoken_1.sign({
        userId: user.id,
    }, process.env.USER_ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    });
    return token;
};
exports.createUserAccessToken = createUserAccessToken;
const createUserRefreshToken = (user) => {
    const token = jsonwebtoken_1.sign({
        userId: user.id,
        tokenVersion: user.tokenVersion
    }, process.env.USER_REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
    return token;
};
exports.createUserRefreshToken = createUserRefreshToken;
//# sourceMappingURL=token.js.map