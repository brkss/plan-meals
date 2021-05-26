import { CreateDayInput } from "../helpers/inputs/day.input";
import * as httpContext from 'express-http-context'
import { User } from "../entity/User";
import { Day } from "../entity/Day";
import { AddRecipeToMeal } from "../helpers/inputs/recipe_meal_day.input";
import { DefaultResponse } from "../helpers/responses/default.response";
import { CreateMealInput } from "../helpers/inputs/meal.input";
import { Meal } from "../entity/Meal";
import { Recipe } from "../entity/Recipe";


export class DayService {


    private default_meals : string[] = [
        'Breakfast',
        'Lunch',
        'Dinner'
    ];

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
        const day = await Day.findOne({where: {date: input.date}});
        if(day){
            return {
                status: true,
                message: 'Day already exist!',
                id: day.id
            }
        }

        // create day
        try {
            const day_resp = await Day.insert({
                title: input.title,
                date: input.date, // "ddMMyyyy" exp => 22MAY2021
                user: user
            });
            
            // create default meals 
            this.default_meals.forEach(async (meal) => {
                await this.CreateMeal({title: meal, day_id: day_resp.identifiers[0].id})
            })

            return {
                status: true,
                message: 'day created successfuly',
                id: day_resp.identifiers[0].id
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
    public async addRecipetoMeal(input: AddRecipeToMeal) : Promise<DefaultResponse>{
        if(!input  || !input.meal_id || !input.recipe_id || !input.day_id){
            return {
                status: false,
                message: 'Invalid data!'
            }
        }
        
         
        // add recipe to meal 
        const meal = await Meal.findOne({where: {id: input.meal_id}});
        const recipe = await Recipe.findOne({where: {id: input.recipe_id}});
        if(!recipe || !meal){
            return {
                status: false,
                message: 'Invalid recipe or meal data!'
            }
        }
        recipe.meals = [meal];
        await recipe.save();

    
        return {
            status: true, 
            message: 'recipe added to meal successfuly !'
        }
    }

}