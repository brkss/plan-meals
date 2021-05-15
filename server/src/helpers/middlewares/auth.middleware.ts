import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as httpContext from 'express-http-context';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {


    // parse token 
    const authentication : string = req.headers['authentication'] as string;
    //console.log('headers => ', req.headers);
    if(!authentication){
        return res.send({message: 'not athenticated!'}).json()
    }

    const token = authentication.split(' ')[1];
    if(!token){
        return res.send({message: 'not athenticated!'}).json()
    }

    try{

        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as any
        httpContext.set('userId', payload.userId)
        console.log('payload -> ', payload)

    }catch(e){
        res.send({message: 'not athenticated!'}).json()
    }

    //req.body
    //return res.send({message: 'not athenticated!'}).json()
    

    return next()
}