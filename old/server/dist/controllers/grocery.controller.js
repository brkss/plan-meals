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
exports.GroceryController = void 0;
const express_1 = require("express");
const grocery_service_1 = require("../services/grocery.service");
const auth_middleware_1 = require("../helpers/middlewares/auth.middleware");
class GroceryController {
    constructor() {
        this.router = express_1.Router();
        this.service = new grocery_service_1.GroceryService();
        this.routing();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grocery = req.body;
            const resp = yield this.service.create(grocery);
            return res.send(resp).json();
        });
    }
    categories(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.service.groceryCategories();
            return res.send(categories).json();
        });
    }
    groceries(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.service.listGroceries();
            res.send(list).json();
        });
    }
    NextDaysGrocery(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grocery = yield this.service.NextDaysGrocery();
            res.send(grocery).json();
        });
    }
    routing() {
        this.router.post('/create', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.create(req, res));
        this.router.post('/categories', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (_, res) => this.categories(res));
        this.router.post('/list', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (_, res) => this.groceries(res));
        this.router.post('/shop-list', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (_, res) => this.NextDaysGrocery(res));
    }
}
exports.GroceryController = GroceryController;
//# sourceMappingURL=grocery.controller.js.map