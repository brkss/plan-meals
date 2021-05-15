import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from '../helpers/responses/auth.response';
import { createAccessToken, createRefreshToken } from '../helpers/auth/token';
import { LoginInput } from '../helpers/inputs/login.input';
import { Response } from 'express';
import { sendRefreshToken } from '../helpers/auth/sendRefreshToken';
import * as httpContext from 'express-http-context';
import { verify } from 'jsonwebtoken';
import {getConnection} from "typeorm";



export class UserService {



    // login 
    public async login(userInput: LoginInput, res: Response) : Promise<AuthResponse> {
        if(!userInput.username || !userInput.password){
            return{
                ok: false,
                message: 'invalid username or password'
            }
        }
        try {

            const user = await User.findOne({where: {username: userInput.username}});
            if(!user){
                return {
                    ok: false,
                    message: 'username not found'
                }
            }
            const validate = await bcrypt.compare(userInput.password, user.password);
            if(!validate){
                return {
                    ok: false,
                    message: 'incorect password'
                }
            }
            
            // login successfuly

            sendRefreshToken(res, createRefreshToken(user));

            return{
                ok: true,
                accessToken: createAccessToken(user)
            }

        }catch(e){
            console.log('user login error => ', e);
            return{
                ok: false,
                message: 'sorry something went wrong!'
            }
        }
    }

    // register 
    public async register(userInput: User, res: Response) : Promise<AuthResponse>{
        console.log('user => ', userInput);
        if(!userInput || !userInput.name || !userInput.username || !userInput.password ){
            return {
                ok: false,
                message: 'please check your information'
            }
        }
        if(userInput.password.length < 3 || userInput.username.length < 3){
            return {
                ok: false,
                message: 'Password and username must be gratier than 3 characters'
            }
        }
        try {
            const hashedPassword = await bcrypt.hash(userInput.password, bcrypt.genSaltSync(10));
            await User.insert({
                name: userInput.name,
                username: userInput.username,
                password: hashedPassword
            });

            //register successfuly 
            const user = await User.findOne({where:{username: userInput.username}});
            sendRefreshToken(res, createRefreshToken(user!));
            return {
                ok: true,
                accessToken: createAccessToken(user!)
            }
        }catch(e){
            console.log('inserting user error => ', e)
            if(e.code === 'ER_DUP_ENTRY'){
                return {
                    ok: false,
                    message: 'duplicated username'
                }
            } 
            return {
                ok: false,
                message: 'something went wrong'
            }
        }
        
    }  

    // refresh token 
    public async refreshToken(token: string, res: Response){
        if(!token){
            return{
                ok: false,
                accessToken: ''
            }
        }
        let payload = null;
        
        try{
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as any;
        }catch(e){
            console.log('refresh token => ', e);
            return {
                ok: false,
                accessToken: ''
            }
        }
        const user = await User.findOne({where: {id: payload.userId}});
        if(!user){
            return {
                ok: false,
                accessToken: ''
            }
        }

        // check token version 
        if(payload.version !== user.tokenVersion){
            return {
                ok: false,
                accessToken: ''
            }
        }

        sendRefreshToken(res, createRefreshToken(user));
        return {
            ok: true,
            accessToken: createAccessToken(user)
        }
        
    }


    // me 
    public async me(){
        
        return {
            hello: 'hey',
            userId: httpContext.get('userId')
        }
    }


    // revoke token 
    public async revokeToken(userId: string){
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            return {
                ok: false,
                message: 'user not found'
            }
        }
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({tokenVersion: user.tokenVersion + 1 })
            .where("id = :id", {id: user.id}).execute();
        return {
            ok: true,
            message: 'token revoked'
        }
    }


}