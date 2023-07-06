import jwt from 'jsonwebtoken';
import UnauthenticatedError from '../errors/unauthenicated.js';

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Making each day of the year');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId};
        next();
    } catch(error) {
        throw new UnauthenticatedError('To live a better life, I need my love to be here');
    }
}

export default auth;