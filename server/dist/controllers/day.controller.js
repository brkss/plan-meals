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
const day_service_1 = require("../services/day.service");
class DayController {
    constructor() {
        this.router = express_1.Router();
        this.service = new day_service_1.DayService();
        this.routing();
    }
    create(res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.service.createDay());
        });
    }
    routing() {
        this.router.get('/', (_, res) => this.create(res));
    }
}
exports.DayController = DayController;
//# sourceMappingURL=day.controller.js.map