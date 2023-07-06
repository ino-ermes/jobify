import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
    const defaultError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: 'エラーが発生しました、もう一度お試してください',
    };
    
    if(error.message) {
        defaultError.msg = error.message;
    }

    if(error.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(error.errors).map((value) => value.message).join(', ');
    }

    if(error.code && error.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = 'そのメールは既に使われています';
    }

    res.status(defaultError.statusCode).send({msg: defaultError.msg});
};

export default errorHandlerMiddleware;