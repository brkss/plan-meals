import { CreateDayInput } from "../helpers/inputs/day.input";
import * as httpContext from 'express-http-context'
import { User } from "../entity/User";
import { Day } from "../entity/Day";
import { RecipeToMealInput } from "../helpers/inputs/recipe_meal_day.input";
import { DefaultResponse } from "../helpers/responses/default.response";
import { CreateMealInput } from "../helpers/inputs/meal.input";
import { Meal } from "../entity/Meal";
import { Recipe } from "../entity/Recipe";


export class DayService {



    public async createDay(input: CreateDayInput) : Promise<DefaultResponse>{
        if(!input || !input.date || !input.title){
            return {
                status: false,
                message: 'Invalid data!'
            }
        }
        const user = await User.findOne({where: {id: httpContext.get('userId')}})
        if(!user){
            return {
                status: false,
                message: 'User not found'
            }
        }

        //check if day exist 
        const day = await Day.findOne({where: {date: input.date.toUpperCase()}});
        if(day){
            const meals = await Meal.find({where: {day: day}, order: {id: 'ASC'}, relations: ['recipes']});
            return {
                status: true,
                message: 'Day already exist!',
                id: day.id,
                meals: meals
            }
        }
 
        // create day
        try {
            const day_resp = await Day.insert({
                title: input.title,
                date: input.date, // "ddMMyyyy" exp => 22MAY2021
                user: user
            });
            const day = await Day.findOne({where: {id: day_resp.identifiers[0].id}});
            // create default meals ....
            await this.CreateMeal({title: 'Breakfast', day_id: day!.id});
            await this.CreateMeal({title: 'Lunch', day_id: day!.id});
            await this.CreateMeal({title: 'Dinner', day_id: day!.id});

            const meals = await Meal.find({where: {day: day}, order: {id: 'ASC'}});
            return {
                status: true,
                message: 'day created successfuly',
                id: day_resp.identifiers[0].id,
                meals: meals
            }
        }catch(e) {
            console.log('create date error => ', e);
            return {
                status: false,
                message: 'Something went wrong'
            }
        }

        
        
    }

    public async CreateMeal(input: CreateMealInput) : Promise<DefaultResponse> {
        if(!input || !input.day_id || !input.title){
            return {
                status: false,
                message: 'Invalid Data!'
            }
        }
        const day = await Day.findOne({where: {id: input.day_id}});
        if(!day){
            return {
                status: false,
                message: 'Day not found!'
            }
        }

        try {
            const meal = await Meal.insert({
                day: day,
                title: input.title
            });
            return {
                status: true, 
                message: 'Meal created successfuly',
                id: meal.identifiers[0].id
            }
        }catch(e){
            console.log('creating day response => ', e)
            return {
                status: false,
                message: 'Something went wrong while creating new meal!'
            }

        }
        
    }


    // add recipe to meal
    public async addRecipetoMeal(input: RecipeToMealInput) : Promise<DefaultResponse>{
        if(!input  || !input.meal_id || !input.recipe_id ){
            return {
                status: false,
                message: 'Invalid data!'
            }
        }
        
        if(!await this.checkIfMealBelongToUser(input.meal_id)){
            return {
                status: false,
                message: 'Something is wrong with your meal'
            }
        }
         
        // add recipe to meal 
        const meal = await Meal.findOne({where: {id: input.meal_id}});
        
        const recipe = await Recipe.findOne({where: {id: input.recipe_id}, relations:['meals']});
        if(!recipe || !meal){
            return {
                status: false,
                message: 'Invalid recipe or meal data!'
            }
        }
        if(recipe.meals.findIndex(x => x.id === meal.id) !== -1){
            return {
                status: false,
                message: 'You already added this recipe to your meal :D'
            }
        }
        recipe.meals = [meal];
        await recipe.save();

    
        return {
            status: true, 
            message: 'recipe added to meal successfuly !'
        }
    }

    // delete meal 
    async deleteMeal(id: number) : Promise<DefaultResponse>{

        if(!id) return {
            status: false,
            message: 'Invalid Meal ID!'
        }
        if(!await this.checkIfMealBelongToUser(id)){
            return {
                status: false,
                message: 'Something is wrong with your meal'
            }
        }

        try {

            await Meal.delete({id: id});

        }catch(e){
            console.log('error deleting ')
        }

        return {
            status: true,
            message: 'Meal deleted successfuly'
        }
    }

    // delete recipe from a meal 
    async deleteRecipeFromMeal(input: RecipeToMealInput) : Promise<DefaultResponse>{

        if(!input || !input.meal_id || !input.recipe_id){
            return {
                status: false,
                message: 'Invalid data!'
            }
        }


        if(!await this.checkIfMealBelongToUser(input.meal_id)){
            return {
                status: false,
                message: 'Something is wrong with your meal'
            }
        }
        

        return {
            status: true,
            message: ''
        }

    }


    async checkIfMealBelongToUser(meal_id: number){
        const meal = await Meal.findOne({where:{id: meal_id}, relations: ['day', 'day.user']});
        if(!meal){
            return false;
        }
        if(meal.day.user.id !== httpContext.get('userId')){
            return false
        }
        return true;
    }

}