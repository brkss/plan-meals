import { BowlElement } from '../../entity/BowlElement';
import { User } from '../../entity/User';
import { MyContext } from '../../helpers/types/Context';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { BowlElementCategory } from '../../entity/BowlElementCategories'; 
import { isUserAuth } from '../../helpers/middlewares/auth.mw';

@Resolver()
export class BowlElementCategoryResolver {


    @Query(() => [BowlElementCategory])
    @UseMiddleware(isUserAuth)
    async bowlElementCategories(@Ctx() ctx: MyContext) : Promise<BowlElementCategory[]>{
        const user = await User.findOne({where : {id: ctx.payload.userid}});
        if(!user){
            return [];
        }
        const elements = await BowlElement.find({where: {user: user}});
        return await BowlElementCategory.find({where: {elements: elements}}); 
    }
    
    
}