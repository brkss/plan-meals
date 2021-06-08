import { BowlElement } from 'src/entity/BowlElement';
import { User } from 'src/entity/User';
import { MyContext } from 'src/helpers/types/Context';
import { Ctx, Query, Resolver } from 'type-graphql';
import { BowlElementCategory } from '../../entity/BowlElementCategories';

@Resolver()
export class BowlElementCategoryResolver {


    @Query(() => [BowlElementCategory])
    async bowlElementCategories(@Ctx() ctx: MyContext) : Promise<BowlElementCategory[]>{
        const user = await User.findOne({where : {id: ctx.payload.userid}});
        if(!user){
            return [];
        }
        const elements = await BowlElement.find({where: {user: user}});
        return await BowlElementCategory.find({where: {elements: elements}}); 
    }
    
    
}