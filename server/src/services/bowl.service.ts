import { CreateBowlGroceryInput } from "../helpers/inputs/bowl.input";
import { DefaultResponse } from "../helpers/responses/default.response";
import httpContext from 'express-http-context';
import { BowlGrocery } from "../entity/BowlGrocery";
import { BowlGroceryCategory } from "../entity/BowlGroceryCategory";
import { User } from "../entity/User";


export class BowlService {

    public async createBowlGrocery(input: CreateBowlGroceryInput) : Promise<DefaultResponse>{
        if(!input || !input.title || !input.category_id ){
            return {
                status: false,
                message: 'Invalid Data !'
            }
        }
        // find user 
        const user = await User.findOne({where: {id : httpContext.get('userId')}});
        if(!user){
            return {
                status: false,
                message: 'User not found !!'
            }
        }
        const bowl_grocery_category = await BowlGroceryCategory.findOne({where: {id: input.category_id}});
        if(!bowl_grocery_category){
            return {
                status: false,
                message: 'Bowl Grocery category not found !'
            }
        }

        try {
            await BowlGrocery.insert({
                cals: input.cals ? Number(input.cals) : 0,
                title: input.title,
                category: bowl_grocery_category,
                user: user
            });
            return {
                status: true, 
                message: 'Bowl grocery added successfuly !'
            }
        }catch(e){
            console.log('create bowl grocery error => ', e);
            return {
                status: false, 
                message: 'Something went wring while adding you grocery !'
            }
        }

    }

}