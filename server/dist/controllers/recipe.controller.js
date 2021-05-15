"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const express_1 = require("express");
class RecipeController {
    constructor() {
        this.router = express_1.Router();
        this.routing();
    }
    index(res) {
        res.send({ message: 'recipe working' });
    }
    routing() {
        this.router.get('/', (_, res) => this.index(res));
    }
}
exports.RecipeController = RecipeController;
//# sourceMappingURL=recipe.controller.js.map