import { buildSchema } from "type-graphql"
import { UserResolver } from '../../resolvers/user/user.resolver';  
import { BowlElementResolver } from '../../resolvers/bowl/bowlElement.resolver';
import { BowlElementCategoryResolver } from '../../resolvers/bowl/bowlElementCategory.resolver';
import { GraphQLSchema } from "graphql";

export const createSchema = async () : Promise<GraphQLSchema | undefined> => {
    return await buildSchema({
        resolvers: [UserResolver, BowlElementResolver, BowlElementCategoryResolver],
        validate: true
    })
}