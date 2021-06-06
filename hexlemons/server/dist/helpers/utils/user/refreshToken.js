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
exports.refreshUserToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../../../entity/User");
const sendRefreshToken_1 = require("./sendRefreshToken");
const token_1 = require("./token");
const refreshUserToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.ujid;
    if (!token) {
        res.send({
            status: false,
            aceessToken: ''
        });
    }
    let payload = null;
    try {
        payload = jsonwebtoken_1.verify(token, process.env.USER_REFRESH_TOKEN_SECRET);
    }
    catch (e) {
        return res.send({
            status: false,
            accessToken: ''
        });
    }
    const user = yield User_1.User.findOne({ where: { id: payload.userId } });
    if (!user) {
        return res.send({
            status: false,
            accessToken: ''
        });
    }
    if (payload.tokenVersion !== user.tokenVersion) {
        return res.send({
            status: false,
            accessToken: ''
        });
    }
    sendRefreshToken_1.sendRefreshToken(res, token_1.createUserRefreshToken(user));
    return res.send({
        status: true,
        accessToken: token_1.createUserAccessToken(user)
    });
});
exports.refreshUserToken = refreshUserToken;
//# sourceMappingURL=refreshToken.js.map