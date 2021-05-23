import { CreateDayInput } from "../helpers/inputs/day.input";
import * as httpContext from 'express-http-context'
import { User } from "../entity/User";
import { Day } from "../entity/Day";


export class DayService {


    public async createDay(input: CreateDayInput){
        if(!input || !input.date || !input.title){
            return {
                status: false,
                message: 'Invalid data!'
            }
        }
        const user = await User.findOne({where: {id: 5}})
        if(!user){
            return {
                status: false,
                message: 'User not found'
            }
        }
        // create day
        try {
            await Day.insert({
                title: input.title,
                date: input.date,
                user: user
            });
        }catch(e) {
            console.log('create date error => ', e);
            return {
                status: false,
                message: 'Something went wrong'
            }
        }

        return {
            status: true,
            message: 'day created successfuly'
        }
        

    }

}