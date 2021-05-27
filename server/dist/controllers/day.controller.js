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
exports.DayController = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../helpers/middlewares/auth.middleware");
const day_service_1 = require("../services/day.service");
class DayController {
    constructor() {
        this.router = express_1.Router();
        this.service = new day_service_1.DayService();
        this.routing();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const day = req.body;
            const resp = yield this.service.createDay(day);
            res.send(resp).json();
        });
    }
    addRecipeToMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            const resp = yield this.service.addRecipetoMeal(input);
            res.send(resp).json();
        });
    }
    deleteMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const resp = yield this.service.deleteMeal(id);
            res.send(resp).json();
        });
    }
    createMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = req.body;
            const resp = yield this.service.CreateMeal(input);
            res.send(resp).json();
        });
    }
    routing() {
        this.router.post('/create', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.create(req, res));
        this.router.post('/add-recipe-to-meal', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.addRecipeToMeal(req, res));
        this.router.post('/add-meal', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.createMeal(req, res));
        this.router.post('/delete-meal', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.deleteMeal(req, res));
    }
}
exports.DayController = DayController;
//# sourceMappingURL=day.controller.js.map