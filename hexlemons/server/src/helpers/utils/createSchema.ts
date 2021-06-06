import { buildSchema } from "type-graphql"
import { UserResolver } from '../../resolvers/user/user.resolver';  
import { BowlResolver } from '../../resolvers/bowl/bowl.resolver';
import { GraphQLSchema } from "graphql";

export const createSchema = async () : Promise<GraphQLSchema | undefined> => {
    return await buildSchema({
        resolvers: [UserResolver, BowlResolver],
        validate: true
    })
}