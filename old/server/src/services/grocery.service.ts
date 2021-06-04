import { GroceryCategory } from "../entity/GroceryCategory";
import { Grocery } from "../entity/Grocery";
import { User } from "../entity/User";
import { CreateGroceryInput } from "../helpers/inputs/grocery.input";
import * as httpContext from 'express-http-context';
import { NextDays } from "../helpers/fns/dates.fn";
import { Day } from "../entity/Day";


export class GroceryService {



    public async create(input: CreateGroceryInput){
        console.log('_input => ', input);
        if(!input || input.available === undefined || !input.title || input.price === undefined || !input.category_id){
            return {
                status: false,
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
        try {
            const category = await GroceryCategory.findOne({where: {id: input.category_id}});
            if(!category){
                return {
                    status: false,
                    message: 'Category not found'
                }
            }
            const existing_grocery = await Grocery.find({where: {title: input.title}});
            if(existing_grocery.length > 0){
                return {
                    status: false,
                    message: 'I thing this item aleready exist'
                }
            }
            const resp_create_grocery = await Grocery.insert({
                available: Boolean(input.available),
                title: input.title,
                price: input.price,
                user: user,
                category: category
            });
            console.log('grocery insert => ', );
            return {
                status: true,
                message: 'grocery element created successfuly',
                item: await Grocery.findOne({where: {id: resp_create_grocery.identifiers[0].id}})
            }

        }catch(e) {
            console.log('creating grocery error => ', e);
            return {
                status: false,
                message: 'something went wrong'
            }
        }
    }


    // get groceries categories 
    async groceryCategories(){
        const categories = await GroceryCategory.find();
        return categories;
    }

    //get list groceries
    async listGroceries(){
        const user = await User.findOne({where: {id: httpContext.get('userId')}});
        if(!user){
            return {
                status: false,
                data: []
            }
        }
        const groceries = await Grocery.find({where: {user: user}, relations: ['category']})
        return {
            status: true,
            data: groceries
        }
    }


    async NextDaysGrocery(){

        const days = NextDays(3);
        let shop_list : any = [];
        const user = await User.findOne({where: {id: httpContext.get('userId')}});
        if(!user){
            return {
                status: false,
                message: 'User not found !',
                data: []
            }
        }
        for(const day of days){
            const _day = await Day.findOne({where: {date: day.ref, user: user}, relations: ['meals', 'meals.recipes', 'meals.recipes.ingredients', 'meals.recipes.ingredients.grocery']});
            if(_day){
                let groceries : any[] = [];
                for(const meal of _day.meals){
                    if(meal.recipes.length > 0){
                        
                        for(const recipe of meal.recipes){
                            groceries.push(
                                recipe.ingredients.map((ing) => (
                                    ing.grocery
                                ))
                            )
                        }
                    }
                }
                if(groceries.length > 0){
                    shop_list.push(
                        {
                            name: _day.title,
                            grcoeries: groceries.concat.apply([], groceries)
                        }
                    )
                }
                
            }
        }

        return{
            status: true,
            data: shop_list
        }

    }


    async NextDaysGrocery2(){
        const days = NextDays(3);
        let shop_list : any[] = [];
        const user = await User.findOne({where: {id: httpContext.get('userId')}});
        if(!user){
            return {
                status: false,
                message: 'User not found!',
                data: []
            }
        }
        for(const day of days){
            const d = await Day.findOne({where: {date: day.ref, user: user}, relations: ['meals', 'meals.recipes', 'meals.recipes.ingredients', 'meals.recipes.ingredients.grocery']});
            
            if(d && d.meals.length > 0 && d.meals){
                console.log('passed days => ',  day.ref);
                let day_tmp = {
                    name: d.title,
                    grcoeries: {} as any
                }
                // map day groceries....
                let groceries : any[] = []; 
                try {
                    for(const meal of d.meals){
                       if(meal.recipes.length === 0) return;
                        for(const recipe of meal.recipes){
                            if(recipe.ingredients.length === 0) break;
                            groceries.push(recipe.ingredients.map((ing) => {
                                return ing.grocery
                            }));
                       }   
                    }
                }finally {
                    //console.log('groceries => ', groceries);
                    day_tmp.grcoeries = groceries.concat.apply([], groceries);
                    shop_list.push(day_tmp);
                }
                groceries = [];

                /* 
                let day_tmp = {
                    name: d.title,
                    grcoeries: {} as any
                }
                // map day groceries....
                let groceries : any[] = []; 
                for(const meal of d.meals){
                   if(meal.recipes.length === 0) break;
                    for(const recipe of meal.recipes){
                        if(recipe.ingredients.length === 0) break;
                        groceries.push(recipe.ingredients.map((ing) => {
                            return ing.grocery
                        }));
                   }   
                }
                //console.log('groceries => ', groceries);
                day_tmp.grcoeries = groceries.concat.apply([], groceries);
                shop_list.push(day_tmp);
                groceries = []; */
            }
        }
        //console.log('grocery => ', shop_list);
        return{
            status: true,
            data: shop_list
        }
    }

}