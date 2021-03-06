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
const auth_middleware_1 = require("../helpers/middlewares/auth.middleware");
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
            console.log('recipe => ', recipe);
            const resp = yield this.service.createRecipe(recipe);
            return res.send(resp).json();
        });
    }
    createFromUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = req.body.url;
            console.log('url => ', url);
            const resp = yield this.service.createRecipeByUrl(url);
            console.log('create from url response => ', resp);
            return res.send(resp).json();
        });
    }
    recipes(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.service.recipes();
            res.send(resp).json();
        });
    }
    recipeInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.recipe_id;
            const resp = yield this.service.recipeInfo(id);
            res.send(resp).json();
        });
    }
    deleteRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.recipe_id;
            const resp = yield this.service.deleteRecipe(id);
            res.send(resp).json();
        });
    }
    routing() {
        this.router.get('/', (_, res) => this.index(res));
        this.router.post('/create', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.create(req, res));
        this.router.post('/create-from-url', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.createFromUrl(req, res));
        this.router.post('/list', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (_, res) => this.recipes(res));
        this.router.post('/info', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.recipeInfo(req, res));
        this.router.post('/delete', (req, res, next) => auth_middleware_1.isAuth(req, res, next), (req, res) => this.deleteRecipe(req, res));
    }
}
exports.RecipeController = RecipeController;
//# sourceMappingURL=recipe.controller.js.map