import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types/Context';
import {verify} from 'jsonwebtoken';

export const isUserAuth : MiddlewareFn<MyContext> = ({context}, next) => {

    const authorization = context.req.headers['authorization'];
    if(!authorization){
        throw new Error('Not authenticated!');
    }

    const token = authorization.split(' ')[1];
    if(!token){
        throw new Error('Invalid token !');
    }
    
    try{
        const payload = verify(token, process.env.USER_ACCESS_TOKEN_SECRET!);
        context.payload = payload;
    }catch(e){
        //console.log('middleware invalid token error => ', e);
        throw new Error('Invalid token')
    }

    return next();
}