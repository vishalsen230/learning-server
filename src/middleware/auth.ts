import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');

interface UserReq extends Request {
    isAuth: boolean;
    userId: String;
}

const PRIVATE_KEY = 'PRIVATE_KEY';

module.exports = (req: UserReq, res: Response) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        req.isAuth = false;
        return { request: req, response: res };
    }

    const token = authHeader?.split('Bearer ')[1];

    let decodedToken = null;

    try {
        decodedToken = jwt.verify(token, PRIVATE_KEY);
        console.log('decodedToken', decodedToken);
    } catch (err) {
        req.isAuth = false;
        return { request: req, response: res };
    }

    if (!decodedToken) {
        req.isAuth = false;
        return { request: req, response: res };
    }

    req.userId = decodedToken.user_id;
    req.isAuth = true;
    return { request: req, response: res };
};
