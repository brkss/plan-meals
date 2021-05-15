import { IDirection } from "../types/IDirection";
import { IIngredients } from "../types/IIngredients";
import { IRecipe } from "../types/IRecipe";
import { IUrl } from "../types/IUrl";


export interface CreateRecipeInput {

    recipe: IRecipe;
    urls: IUrl[];
    directions: IDirection[];
    ingredients: IIngredients[];
    
}

