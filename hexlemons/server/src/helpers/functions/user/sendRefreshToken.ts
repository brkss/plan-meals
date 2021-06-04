import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) : void => {
    res.cookie('ujid', token, {
        httpOnly: true
    });
}