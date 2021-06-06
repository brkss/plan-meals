import { Request, Response} from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../../../entity/User';
import { sendRefreshToken } from './sendRefreshToken';
import { createUserAccessToken, createUserRefreshToken } from './token';

export const refreshUserToken = async (req: Request, res: Response) => {

    const token = req.cookies.ujid;
    if(!token){
        res.send({
            status: false,
            aceessToken: ''
        });
    }
    let payload : any = null;
    try {
        payload = verify(token, process.env.USER_REFRESH_TOKEN_SECRET!);
    }catch(e){
        return res.send({
            status: false,
            accessToken: ''
        });
    }
    // valid token
    const user = await User.findOne({where: {id: payload.userId}});
    if(!user){
        return res.send({
            status: false,
            accessToken: ''
        }); 
    }

    // check if token valid ..
    if(payload.tokenVersion !== user.tokenVersion){
        return res.send({
            status: false,
            accessToken: ''
        });
    }

    // refresh token;
    sendRefreshToken(res, createUserRefreshToken(user));

    return res.send({
        status: true,
        accessToken: createUserAccessToken(user)
    });


    

}