import { RecipeController } from './recipe.controller';
import { UserController } from './user.controller';
import { GroceryController } from './grocery.controller';

export const controllers = {
    user : new UserController(),
    recipe: new RecipeController(),
    grocery: new GroceryController()
}