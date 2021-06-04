import { LoginUserInput, RegisterUserInput } from '../helpers/inputs/user.input';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import { AuthResponse } from '../helpers/responses/auth.response';
import { createUserAccessToken, createUserRefreshToken } from '../helpers/functions/user/token';
import { MyContext } from '../helpers/types/Context';
import { sendRefreshToken } from '../helpers/functions/user/sendRefreshToken';
import { isUserAuth } from '../helpers/middlewares/auth.mw';

@Resolver()
export class UserResolver {

    @Query(() => String)
    hello(){
        return 'hi!!'
    }

    @Query(() => String)
    @UseMiddleware(isUserAuth)
    me(@Ctx() ctx : MyContext){
        return `user => ${ctx.payload.userId}`
    }

    @Mutation(() => AuthResponse)
    async login(@Arg('data') data : LoginUserInput, @Ctx() {res} : MyContext ) : Promise<AuthResponse>{
        
        if(!data.identifier){
            return {
                status: false,
                message: 'Invalid Email/Phone'
            }
        }
        if(!data.password){
            return {
                status: false,
                message: 'Invalid password'
            }
        }

        const user = await User.findOne({where: [{email: data.identifier}, {phone: data.identifier}]});
        if(!user){
            return {
                status: false,
                message: 'Invalid Email/Phone'
            }
        }
        const verify = await bcrypt.compare(data.password, user.password);
        if(!verify){
            return {
                status: false,
                message: 'Incorrect password!'
            }
        }

        // successfuly logged in

        sendRefreshToken(res, createUserRefreshToken(user));
        return {
            status: true,
            accessToken: createUserAccessToken(user)
        }
    }

    @Mutation(() => AuthResponse)
    async register(@Arg('data') data : RegisterUserInput, @Ctx() {res} : MyContext ) : Promise<AuthResponse>{
        // validate 
        if(!data.name || !data.email || !data.phone || !data.password){
            return {
                status: false,
                message: 'invalid data'
            }
        }

        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            await User.insert({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: hashedPassword
            });
            const user = await User.findOne({where: {email: data.email}});
            sendRefreshToken(res, createUserRefreshToken(user!));
            return {
                status: true,
                accessToken: createUserAccessToken(user!)
            }

        }catch(e){
            console.log('error creatin user => ', e);
            if(e.code === "ER_DUP_ENTRY"){
                return {
                    status: false,
                    message: "Phone or email already exist!"
                }
            }
            return {
                status: false,
                message: 'Something went wrong creating your account!'
            }
        }

    }

}