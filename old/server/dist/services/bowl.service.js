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
exports.BowlService = void 0;
const express_http_context_1 = __importDefault(require("express-http-context"));
const BowlGrocery_1 = require("../entity/BowlGrocery");
const BowlGroceryCategory_1 = require("../entity/BowlGroceryCategory");
const User_1 = require("../entity/User");
const Bowl_1 = require("../entity/Bowl");
class BowlService {
    createBowl(input) {
        return __awaiter(this, void 0, void 0, function* () {
            input.bowlGroceries = JSON.parse(input.bowlGroceries);
            if (!input || !input.title || !input.ticket || !input.time || input.bowlGroceries.length === 0) {
                return {
                    status: false,
                    message: 'Some data is missing to create this bowl :('
                };
            }
            const user = yield User_1.User.findOne({ where: { id: express_http_context_1.default.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    message: 'user not found !'
                };
            }
            let bowl = new Bowl_1.Bowl();
            bowl.title = input.title;
            bowl.ticket = input.ticket;
            bowl.time = input.time;
            bowl.user = user;
            bowl.elements = [];
            for (const id of input.bowlGroceries) {
                console.log('element id => ', id);
                const element = yield BowlGrocery_1.BowlGrocery.findOne({ id });
                if (!element) {
                    return {
                        status: false,
                        message: 'Element not found !'
                    };
                }
                console.log('element -> ', element);
                bowl.elements.push(element);
            }
            yield bowl.save();
            return {
                status: true,
                message: 'Bowl created successfuly !'
            };
        });
    }
    createBowlGrocery(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.title || !input.category_id) {
                return {
                    status: false,
                    message: 'Invalid Data !'
                };
            }
            const user = yield User_1.User.findOne({ where: { id: express_http_context_1.default.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found !!'
                };
            }
            const bowl_grocery_category = yield BowlGroceryCategory_1.BowlGroceryCategory.findOne({ where: { id: input.category_id } });
            if (!bowl_grocery_category) {
                return {
                    status: false,
                    message: 'Bowl Grocery category not found !'
                };
            }
            try {
                yield BowlGrocery_1.BowlGrocery.insert({
                    cals: input.cals ? Number(input.cals) : 0,
                    title: input.title,
                    category: bowl_grocery_category,
                    user: user
                });
                return {
                    status: true,
                    message: 'Bowl grocery added successfuly !'
                };
            }
            catch (e) {
                console.log('create bowl grocery error => ', e);
                return {
                    status: false,
                    message: 'Something went wring while adding you grocery !'
                };
            }
        });
    }
    getBowlGroceriesCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BowlGroceryCategory_1.BowlGroceryCategory.find();
        });
    }
    getBowls() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: express_http_context_1.default.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found !'
                };
            }
            const bowls = yield Bowl_1.Bowl.find({ where: { user: user }, relations: ['elements', 'elements.category'] });
            return {
                status: true,
                message: `${bowls.length} bowls founds!`,
                data: bowls
            };
        });
    }
    getBowlElements() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: express_http_context_1.default.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    message: 'user not found !'
                };
            }
            const bowlElements = yield BowlGrocery_1.BowlGrocery.find({ where: { user: user } });
            return {
                status: true,
                message: `${bowlElements.length} elemts found `,
                data: bowlElements
            };
        });
    }
}
exports.BowlService = BowlService;
//# sourceMappingURL=bowl.service.js.map