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
exports.RecipeService = void 0;
const Recipe_1 = require("../entity/Recipe");
const User_1 = require("../entity/User");
const Url_1 = require("../entity/Url");
const Direction_1 = require("../entity/Direction");
const Ingredient_1 = require("../entity/Ingredient");
const Grocery_1 = require("../entity/Grocery");
const httpContext = __importStar(require("express-http-context"));
class RecipeService {
    createRecipe(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('recipe input => ', input);
            if (!input || !input.directions || !input.ingredients || !input.urls || !input.recipe) {
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
                const recipe_id = yield Recipe_1.Recipe.insert({
                    title: input.recipe.title,
                    description: input.recipe.description,
                    tags: input.recipe.tags,
                    public: Boolean(input.recipe.public),
                    user: user
                }).then(res => {
                    return res.identifiers[0].id;
                });
                const recipe = yield Recipe_1.Recipe.findOne({ where: { id: recipe_id } });
                input.urls.forEach((url) => __awaiter(this, void 0, void 0, function* () {
                    yield Url_1.Url.insert({
                        recipe: recipe,
                        link: url.link,
                        title: url.title
                    });
                }));
                input.directions.forEach((direction) => __awaiter(this, void 0, void 0, function* () {
                    yield Direction_1.Direction.insert({
                        text: direction.text,
                        title: direction.title,
                        recipe: recipe
                    });
                }));
                input.ingredients.forEach((ingredient) => __awaiter(this, void 0, void 0, function* () {
                    yield Ingredient_1.Ingredient.insert({
                        measurement: ingredient.measurement,
                        calories: ingredient.calories,
                        recipe: recipe,
                        grocery: yield Grocery_1.Grocery.findOne({ where: { id: ingredient.grocery_id } })
                    });
                }));
                return {
                    status: true,
                    message: 'Reicipe Added Successfuly'
                };
            }
            catch (e) {
                console.log('creating recipe error => ', e);
                return {
                    status: false,
                    message: 'Error accured while creating recipe, please check your data and try againg'
                };
            }
        });
    }
    recipes() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: httpContext.get('userId') } });
            if (!user) {
                return {
                    status: false,
                    message: 'user not found!'
                };
            }
            const recipes = yield Recipe_1.Recipe.find({
                where: { user: user }
            });
            return {
                status: true,
                data: recipes
            };
        });
    }
}
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe.service.js.map