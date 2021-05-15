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
exports.GroceryService = void 0;
const Grocery_1 = require("../entity/Grocery");
const User_1 = require("../entity/User");
class GroceryService {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.available || !input.title) {
                return {
                    status: false,
                    message: 'invalid data'
                };
            }
            const user = yield User_1.User.findOne({ where: { id: 1 } });
            if (!user) {
                return {
                    status: false,
                    message: 'user not found'
                };
            }
            try {
                yield Grocery_1.Grocery.insert({
                    available: Boolean(input.available),
                    title: input.title,
                    user: user
                });
                console.log('grocery insert => ');
                return {
                    status: true,
                    message: 'grocery element created successfuly'
                };
            }
            catch (e) {
                console.log('creating grocery error => ', e);
                return {
                    status: false,
                    message: 'something went wrong'
                };
            }
        });
    }
}
exports.GroceryService = GroceryService;
//# sourceMappingURL=grocery.service.js.map