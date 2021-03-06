import { RecipeController } from './recipe.controller';
import { UserController } from './user.controller';
import { GroceryController } from './grocery.controller';
import { DayController } from './day.controller';
import { BowlController } from './bowl.controller';

export const controllers = {
    user : new UserController(),
    recipe: new RecipeController(),
    grocery: new GroceryController(),
    day: new DayController(),
    bowl: new BowlController()
}