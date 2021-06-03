"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BowlController = void 0;
const express_1 = require("express");
class BowlController {
    constructor() {
        this.router = express_1.Router();
        this.routing();
    }
    index(req, res) {
        req.body;
        res.send('hello world from bowl ');
    }
    routing() {
        this.router.get('/', (req, res) => this.index(req, res));
    }
}
exports.BowlController = BowlController;
//# sourceMappingURL=bowl.controller.js.map