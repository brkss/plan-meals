import { BowlElement } from '../../entity/BowlElement';
import { User } from '../../entity/User';
import { MyContext } from '../../helpers/types/Context';
import { Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { BowlElementCategory } from '../../entity/BowlElementCategories'; 
import { isUserAuth } from '../../helpers/middlewares/auth.mw';

@Resolver()
export class BowlElementCategoryResolver {


    @Query(() => [BowlElementCategory])
    @UseMiddleware(isUserAuth)
    async bowlElementCategories() : Promise<BowlElementCategory[]>{
        const categories = await BowlElementCategory.find();
        return categories;
    }

    @Query(() => [BowlElement])
    @UseMiddleware(isUserAuth)
    async bowlElementWithCateogry(@Ctx() ctx: MyContext){
        const user = await User.findOne({where : {id: ctx.payload.userId}});
        if(!user){
            console.log("User not found !")
            return [];
        }

        const elements = await BowlElement.find({where: {user: user}, relations: ['category']});
        return elements;
    }
    
    
}