import { createWriteStream } from 'fs';
import { CreateBowlElementInput } from '../../helpers/inputs/bowl.input';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { BowlElement } from '../../entity/BowlElement';
import { BowlElementCategory } from '../../entity/BowlElementCategories';
import { MyContext } from '../../helpers/types/Context';
import { User } from '../../entity/User';
import { DefaultResponse } from '../../helpers/responses/default.response';
import { isUserAuth } from '../../helpers/middlewares/auth.mw';


@Resolver()
export class BowlElementResolver {

    @Query(() => String)
    helloBowl(){
        return 'hello bowl makers!'
    }

    // create bowl element 
    @Mutation(() => DefaultResponse)
    @UseMiddleware(isUserAuth)
    async createBowlElement(@Arg('data', () => CreateBowlElementInput) data: CreateBowlElementInput, @Ctx() ctx: MyContext) : Promise<DefaultResponse> {
        
        if(!data.title || !data.category || !data.image || !data.calories){
            return {
                status: false,
                message: 'invalid data to create this element!'
            }
        }

        // check user ...
        const user = await User.findOne({where: {id: ctx.payload.userId}});
        if(!user){
            return {
                status: false,
                message: "We can't find your account that's crazy right!"
            }
        }
        
        const file = await data.image;
        
        const image = `/uploads/${Date.now()}-${file.filename}`;
        const bowlElement = new BowlElement();
        
        const bowl_elemet_category = await BowlElementCategory.findOne({where: {id: Number(data.category)}});
        if(!bowl_elemet_category){
            return {
                status: false,
                message: 'Category not valid to create this element!'
            }
        }
        bowlElement.title = data.title;
        bowlElement.category = bowl_elemet_category;
        bowlElement.image = image;
        bowlElement.calories = Number(data.calories); 
        bowlElement.user = user;
        await bowlElement.save();

        file.createReadStream().pipe(
            createWriteStream(__dirname + `/../..${image}`).on('ready', () => console.log('re'))
        )
        return {
            status: true,
            message: 'Element created successfuly'
        }

        /* return new Promise(async (resolve, reject) => {
            file.createReadStream().pipe(
                createWriteStream(__dirname + `/../..${image}`).on('ready', () => console.log('re'))
            )
            .on('finish', () => resolve())
            .on('error', (e) => reject(e))
        }).then(res => { 
            console.log('result => ', res);
        }).catch(e => {
            console.log('error uploading file => ', e);
        });  */
    } 


    // users elements 
    @Query(() => [BowlElement])
    @UseMiddleware(isUserAuth)
    async bowlElements(@Ctx() ctx: MyContext){
        const user = await User.findOne({where: {id: ctx.payload.userId}});
        if(!user){
            return[];
        }

        const elements = await BowlElement.find({where: {user: user}});
        return elements;
    }

}


