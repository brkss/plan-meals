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
exports.DayService = void 0;
const User_1 = require("../entity/User");
const Day_1 = require("../entity/Day");
class DayService {
    createDay(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.date || !input.title) {
                return {
                    status: false,
                    message: 'Invalid data!'
                };
            }
            const user = yield User_1.User.findOne({ where: { id: 5 } });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found'
                };
            }
            try {
                yield Day_1.Day.insert({
                    title: input.title,
                    date: input.date,
                    user: user
                });
            }
            catch (e) {
                console.log('create date error => ', e);
                return {
                    status: false,
                    message: 'Something went wrong'
                };
            }
            return {
                status: true,
                message: 'day created successfuly'
            };
        });
    }
}
exports.DayService = DayService;
//# sourceMappingURL=day.service.js.map