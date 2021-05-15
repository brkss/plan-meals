import { Grocery } from "../entity/Grocery";
import { User } from "../entity/User";
import { CreateGroceryInput } from "../helpers/inputs/grocery.input";


export class GroceryService {



    public async create(input: CreateGroceryInput){
        if(!input || !input.available || !input.title){
            return {
                status: false,
                message: 'invalid data'
            }
        }
        const user = await User.findOne({where: {id: 1}});
        if(!user){
            return {
                status: false,
                message: 'user not found'
            }
        }
        try {
        
            await Grocery.insert({
                available: Boolean(input.available),
                title: input.title,
                user: user
            });
            console.log('grocery insert => ', );
            return {
                status: true,
                message: 'grocery element created successfuly'
            }

        }catch(e) {
            console.log('creating grocery error => ', e);
            return {
                status: false,
                message: 'something went wrong'
            }
        }
    }

}