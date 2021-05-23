import { Recipe } from "../entity/Recipe";
import { User } from "../entity/User";
import { CreateRecipeResponse } from "../helpers/responses/recipe.response";
import { CreateRecipeInput } from "../helpers/inputs/recipe.intup";
import { Url } from "../entity/Url";
import { Direction } from "../entity/Direction";
import { Ingredient } from "../entity/Ingredient";
import { Grocery } from "../entity/Grocery";
import * as httpContext from 'express-http-context';
import fs from 'fs';
import https from 'https';
import mkdirp from 'mkdirp';
const recipeScraper = require("recipe-scraper");


export class RecipeService {


    public async createRecipe(input: CreateRecipeInput ) : Promise<CreateRecipeResponse>{

        console.log('recipe input => ', input);
        if(!input || !input.directions || !input.ingredients || !input.urls || !input.recipe){
            return {
                status: false ,
                message: 'invalid data'
            }
        }
        const user = await User.findOne({where: {id: httpContext.get('userId')}});
        if(!user){
            return {
                status: false,
                message: 'user not found'
            }
        }
        try{
            
            // insert recipe
            const recipe_id = await Recipe.insert({
                title: input.recipe.title,
                description: input.recipe.description,
                tags: input.recipe.tags,
                public: Boolean(input.recipe.public),
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
                    recipe: recipe,
                    grocery: await Grocery.findOne({where: {id: ingredient.grocery_id}})
                })
            });

            return {
                status: true,
                message: 'Reicipe Added Successfuly'
            }

        }catch(e){
            console.log('creating recipe error => ', e);
            return {
                status: false,
                message: 'Error accured while creating recipe, please check your data and try againg'
            }
        }
        
        
    }


    // get recipes 
    public async recipes(){

        const user = await User.findOne({where: {id: httpContext.get('userId')}});
        if(!user){
            return {
                status: false,
                message: 'user not found!'
            }
        }

        const recipes = await Recipe.find({
            where: {user : user},
            order: {id: 'DESC'}
        });
        return {
            status: true, 
            data: recipes
        }
    }

    // get recipe info
    public async recipeInfo(id: number){
        const user = await User.findOne({where: {id: httpContext.get('userId')}});
        if(!user){
            return {
                status: false,
                message: 'user not found!'
            }
        }
        const recipe = await Recipe.find({
            where: {id: id, user: user},
            relations: ['ingredients', 'directions', 'urls', 'ingredients.grocery']
        }) ;
        if(!recipe){
            return {
                status: false,
                message: 'Recipe not found'
            }
        }
        return {
            status: true,
            data: recipe
        }
    }

    // create recipe using url
    public async createRecipeByUrl(url: string) {
        
        let recipe_input = null;
        try {
            recipe_input = await recipeScraper(url);
        }catch {
            return {
                status: false,
                message: 'Site not yet supported!'
            }
        }
        
        // do something with recipe
        console.log('recipe => ', recipe_input);
        if(!recipe_input){
            return {
                status: false,
                message: 'undefiend recipe!'
            }
        }
        const user = await User.findOne({where: {id: httpContext.get('userId')}});
        if(!user){
            return {
                status: false,
                message: 'user not found'
            }
        }
        try{

            //upload image
            /* const dir = `${__dirname}/../uploads/images/${user.id}/`;
            if(fs.existsSync(dir)){
                fs.mkdirSync(dir);
            } */
            fs.mkdirSync(`./uploads/${user.id}`, { recursive: true });
            const file_extension = `${recipe_input.image.split('.')[recipe_input.image.split('.').length - 1]}`;
            const image = `./uploads/${user.id}/${String(Date.now()+Math.floor(Math.random() * 1000))}.${file_extension.includes('?') ? file_extension.split('?')[0] : file_extension}`;
            const file = fs.createWriteStream(image);
            
            https.get(recipe_input.image, function (response) {
                response.pipe(file);
                console.log('files saved !');
                console.log('dire ', __dirname);
            });  
            
            // insert recipe
            const recipe_id = await Recipe.insert({
                title: recipe_input.name,
                description: recipe_input.description || 'no description provided',
                tags: recipe_input.tags.join('|'),
                public: false,
                user: user,
                image: image
            }).then(res => {
                return res.identifiers[0].id
            });
                const recipe = await Recipe.findOne({where: {id: recipe_id}});
                // insert directions
                recipe_input.instructions.forEach(async (direction: any) => {
                    await Direction.insert({
                        text: direction,
                        title: "default",
                        recipe: recipe
                    })
                });
                // insert urls 
            
                await Url.insert({
                    recipe: recipe,
                    link: url,
                    title: "Source" 
                });
        
                //insert ingredients 
                recipe_input.ingredients.forEach(async (ingredient: any) => {
                    await Ingredient.insert({
                        measurement: 'none',
                        recipe: recipe,
                        name: ingredient
                    })
                });

                

                return {
                    status: true,
                    message: 'Reicipe Added Successfuly'
                }

            }catch(e){
                console.log('creating recipe error => ', e);
                return {
                    status: false,
                    message: 'Error accured while creating recipe, please check your data and try againg'
                }
            }
              
        

    }

}