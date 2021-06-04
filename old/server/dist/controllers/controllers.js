"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const recipe_controller_1 = require("./recipe.controller");
const user_controller_1 = require("./user.controller");
const grocery_controller_1 = require("./grocery.controller");
const day_controller_1 = require("./day.controller");
const bowl_controller_1 = require("./bowl.controller");
exports.controllers = {
    user: new user_controller_1.UserController(),
    recipe: new recipe_controller_1.RecipeController(),
    grocery: new grocery_controller_1.GroceryController(),
    day: new day_controller_1.DayController(),
    bowl: new bowl_controller_1.BowlController()
};
//# sourceMappingURL=controllers.js.map