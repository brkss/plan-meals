"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const recipe_controller_1 = require("./recipe.controller");
const user_controller_1 = require("./user.controller");
exports.controllers = {
    user: new user_controller_1.UserController(),
    recipe: new recipe_controller_1.RecipeController()
};
//# sourceMappingURL=controllers.js.map