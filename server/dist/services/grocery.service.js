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
exports.GroceryService = void 0;
const GroceryCategory_1 = require("../entity/GroceryCategory");
const Grocery_1 = require("../entity/Grocery");
const User_1 = require("../entity/User");
const httpContext = __importStar(require("express-http-context"));
class GroceryService {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('_input => ', input);
            if (!input || input.available === undefined || !input.title || input.price === undefined || !input.category_id) {
                return {
                    status: false,
                    message: 'invalid data'
                };
            }
            const user = yield User_1.User.findOne({ where: { id: httpContext.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    message: 'user not found'
                };
            }
            try {
                const category = yield GroceryCategory_1.GroceryCategory.findOne({ where: { id: input.category_id } });
                if (!category) {
                    return {
                        status: false,
                        message: 'Category not found'
                    };
                }
                const existing_grocery = yield Grocery_1.Grocery.find({ where: { title: input.title } });
                if (existing_grocery.length > 0) {
                    return {
                        status: false,
                        message: 'I thing this item aleready exist'
                    };
                }
                const resp_create_grocery = yield Grocery_1.Grocery.insert({
                    available: Boolean(input.available),
                    title: input.title,
                    price: input.price,
                    user: user,
                    category: category
                });
                console.log('grocery insert => ');
                return {
                    status: true,
                    message: 'grocery element created successfuly',
                    item: yield Grocery_1.Grocery.findOne({ where: { id: resp_create_grocery.identifiers[0].id } })
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
    groceryCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield GroceryCategory_1.GroceryCategory.find();
            return categories;
        });
    }
    listGroceries() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: httpContext.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    data: []
                };
            }
            const groceries = yield Grocery_1.Grocery.find({ where: { user: user }, relations: ['category'] });
            return {
                status: true,
                data: groceries
            };
        });
    }
}
exports.GroceryService = GroceryService;
//# sourceMappingURL=grocery.service.js.map