import { Query, Resolver } from 'type-graphql';
import { BowlElementCategory } from '../../entity/BowlElementCategories';

@Resolver()
export class BowlElementCategoryResolver {


    @Query(() => [BowlElementCategory])
    async bowlElementCategories() : Promise<BowlElementCategory[]>{
        return await BowlElementCategory.find(); 
    }
    
    
}