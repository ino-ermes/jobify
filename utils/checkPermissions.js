import {UnauthenticatedError} from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
    if(requestUser.userId === resourceUserId.toString()) return;
    throw new UnauthenticatedError('意味のせいだなんて言わないでほしいだ。');
};

export default checkPermissions;