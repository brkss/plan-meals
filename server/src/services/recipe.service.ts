import { Recipe } from "../entity/Recipe";
import { User } from "../entity/User";
import { CreateRecipeResponse } from "../helpers/responses/recipe.response";
import { CreateRecipeInput } from "../helpers/inputs/recipe.intup";
import { Url } from "../entity/Url";
import { Direction } from "../entity/Direction";
import { Ingredient } from "../entity/Ingredient";
import { Grocery } from "../entity/Grocery";


export class RecipeService {


    public async createRecipe(input: CreateRecipeInput ) : Promise<CreateRecipeResponse>{

        if(!input || !input.directions || !input.ingredients || !input.urls){
            return {
                ok: false ,
                message: 'invalid data'
            }
        }
        const user = await User.findOne({where: {id: 1}});
        if(!user){
            return {
                ok: false,
                message: 'user not found'
            }
        }
        try{
            
            // insert recipe
            const recipe_id = await Recipe.insert({
                title: input.title,
                description: input.description,
                tags: input.title,
                public: Boolean(input.public),
                directions: input.directions,
                ingredients: input.ingredients,
                urls: input.urls,
                user: user
            }).then(res => {
                return res.identifiers[0].id
            });
            const recipe = await Recipe.findOne({where: {id: recipe_id}});
            // insert urls 
            input.urls.forEach(async url => {
                await Url.insert({
                    recipe: recipe,
                    link: url.link,
                    title: url.title 
                });
            })
            // insert directions
            input.directions.forEach(async direction => {
                await Direction.insert({
                    text: direction.text,
                    title: direction.title,
                    recipe: recipe
                })
            });
            //insert ingredients 
            input.ingredients.forEach(async ingredient => {
                await Ingredient.insert({
                    measurement: ingredient.measurement,
                    calories: ingredient.calories, 
                    grocery: await Grocery.findOne({where: {id: ingredient.grocery_id}})
                })
            });

            return {
                ok: true,
                message: 'Reicipe Added Successfuly'
            }

        }catch(e){
            console.log('creating recipe error => ', e);
            return {
                ok: false,
                message: 'Error accured while creating recipe, please check your data and try againg'
            }
        }
        
        
    }

}