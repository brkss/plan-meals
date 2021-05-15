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
exports.RecipeService = void 0;
const Recipe_1 = require("../entity/Recipe");
const User_1 = require("../entity/User");
const Url_1 = require("../entity/Url");
const Direction_1 = require("../entity/Direction");
const Ingredient_1 = require("../entity/Ingredient");
const Grocery_1 = require("../entity/Grocery");
class RecipeService {
    createRecipe(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input || !input.directions || !input.ingredients || !input.urls) {
                return {
                    ok: false,
                    message: 'invalid data'
                };
            }
            const user = yield User_1.User.findOne({ where: { id: 1 } });
            if (!user) {
                return {
                    ok: false,
                    message: 'user not found'
                };
            }
            try {
                const recipe_id = yield Recipe_1.Recipe.insert({
                    title: input.title,
                    description: input.description,
                    tags: input.title,
                    public: Boolean(input.public),
                    directions: input.directions,
                    ingredients: input.ingredients,
                    urls: input.urls,
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
                        grocery: yield Grocery_1.Grocery.findOne({ where: { id: ingredient.grocery_id } })
                    });
                }));
                return {
                    ok: true,
                    message: 'Reicipe Added Successfuly'
                };
            }
            catch (e) {
                console.log('creating recipe error => ', e);
                return {
                    ok: false,
                    message: 'Error accured while creating recipe, please check your data and try againg'
                };
            }
        });
    }
}
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe.service.js.map