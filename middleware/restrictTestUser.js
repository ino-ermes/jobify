import { BadRequestError } from '../errors/index.js';

const restrictTestUser = (req, res, next) => {
    if(req.user.testUser) {
        throw new BadRequestError('このアカウントにはそんな権限がありません！');
    }
    next();
};

export default restrictTestUser;