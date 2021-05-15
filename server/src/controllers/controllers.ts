import { RecipeController } from './recipe.controller';
import { UserController } from './user.controller';

export const controllers = {
    user : new UserController(),
    recipe: new RecipeController()
}