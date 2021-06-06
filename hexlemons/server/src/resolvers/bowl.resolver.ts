import { createWriteStream } from 'fs';
import { CreateBowlElementInput } from '../helpers/inputs/bowl.input';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';


@Resolver()
export class BowlResolver {

    @Query(() => String)
    helloBowl(){
        return 'hello bowl makers!'
    }

    // create bowl element 
    @Mutation(() => Boolean)
    async createBowlElement(@Arg('data') data: CreateBowlElementInput) : Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            data.image.createReadStream().pipe(
                createWriteStream(__dirname + `/../uploads/${data.image.filename}`)
            ).on('finish', () => resolve(true))
            .on('error', () => reject(false))
        })
    } 

}