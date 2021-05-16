"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createAccessToken = (user) => {
    const token = jsonwebtoken_1.sign({
        userId: user.id
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s'
    });
    return token;
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    const token = jsonwebtoken_1.sign({
        userId: user.id,
        version: user.tokenVersion
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
    return token;
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=token.js.map