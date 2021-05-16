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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const httpContext = __importStar(require("express-http-context"));
const isAuth = (req, res, next) => {
    const authorization = req.headers['authorization'];
    console.log('headers => ', req.headers);
    if (!authorization) {
        return res.send({ status: false, message: 'not athenticated!' }).json();
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.send({ status: false, message: 'not athenticated!' }).json();
    }
    try {
        const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
        httpContext.set('userId', payload.userId);
        console.log('payload -> ', payload);
    }
    catch (e) {
        res.send({ status: false, message: 'not athenticated!' }).json();
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.middleware.js.map