import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as httpContext from 'express-http-context';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {


    // parse token 
    const authorization : string = req.headers['authorization'] as string;
    console.log('headers => ', req.headers);
    if(!authorization){
        return res.send({status: false, message: 'not athenticated!'}).json()
    }

    const token = authorization.split(' ')[1];
    if(!token){
        return res.send({status: false, message: 'not athenticated!'}).json()
    }

    try{

        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as any
        httpContext.set('userId', payload.userId)
        console.log('payload -> ', payload)

    }catch(e){
        res.send({status: false, message: 'not athenticated!'}).json()
    }

    //req.body
    //return res.send({message: 'not athenticated!'}).json()
    

    return next()
}