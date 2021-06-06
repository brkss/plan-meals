import { sign } from 'jsonwebtoken';
import { User } from '../../../entity/User';


export const createUserAccessToken = (user: User) : string => {

    // 
    const token = sign({
        userId: user.id,
    }, process.env.USER_ACCESS_TOKEN_SECRET!, {
        expiresIn: '15m'
    });
    return token;

}
 

export const createUserRefreshToken = (user: User) : string => {

    // 
    const token = sign({
        userId: user.id,
        tokenVersion: user.tokenVersion
    }, process.env.USER_REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d'
    });
    return token;

}
