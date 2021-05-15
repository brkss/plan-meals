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
exports.RecipeController = void 0;
const express_1 = require("express");
const recipe_service_1 = require("../services/recipe.service");
class RecipeController {
    constructor() {
        this.router = express_1.Router();
        this.service = new recipe_service_1.RecipeService();
        this.routing();
    }
    index(res) {
        res.send({ message: 'recipe working' });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let recipe = req.body;
            recipe.urls = JSON.parse(recipe.urls);
            recipe.directions = JSON.parse(recipe.directions);
            recipe.ingredients = JSON.parse(recipe.ingredients);
            const resp = yield this.service.createRecipe(recipe);
            console.log('request body => ', req.body);
            console.log('ing calories => ', recipe.ingredients[0].calories);
            return res.send(resp).json();
        });
    }
    routing() {
        this.router.get('/', (_, res) => this.index(res));
        this.router.post('/create', (req, res) => this.create(req, res));
    }
}
exports.RecipeController = RecipeController;
//# sourceMappingURL=recipe.controller.js.map