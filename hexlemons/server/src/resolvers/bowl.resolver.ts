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
    async createBowlElement(@Arg('data', () => CreateBowlElementInput) data: CreateBowlElementInput) {
        console.log('data => ', data);
        const file = await data.image;
        console.log('image => ', file.filename);
        return new Promise(async (resolve, reject) => {
            file.createReadStream().pipe(
                createWriteStream(__dirname + `/../uploads/${file.filename}`).on('ready', () => console.log('re'))
            )
            .on('finish', () => resolve(true))
            .on('error', (e) => reject(e))
        }).then(res => {
            console.log('result => ', res);
        }).catch(e => {
            console.log('error uploading file => ', e);
        }) 
    } 

}


