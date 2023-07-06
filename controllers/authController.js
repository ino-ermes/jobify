import User from '../models/User.js';
import {BadRequestError, UnauthenticatedError} from '../errors/index.js';
import {StatusCodes} from 'http-status-codes';

const register = async (req, res) => {
    const {email, name, password} = req.body;
    if(!email && !name && !password) {
        throw new BadRequestError('何も記入しないですが。。。');
    }
    const user = await User.create(req.body);
    const token = user.createJWT();

    res.status(StatusCodes.OK)
    .json({
        user: {
            name: user.name,
            email: user.email,
            lastname: user.lastname,
            location: user.location,
            id: user._id,
        },
        token,
        location: user.location,
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError('すべとの情報を入力してください');
    }
    const user = await User.findOne({email}).select('+password');;
    if(!user) {
        throw new UnauthenticatedError('アカウントは存在しない');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('パスワードは間違っている');
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({user, token, location: user.location});
};

const updateUser = async (req, res) => {
    const {email, name, lastName, location} = req.body;
    if(!email || !name || !lastName || !location) {
        throw new BadRequestError('ここにあるよ');
    }
    
    const user = await User.findOne({_id: req.user.userId});

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;


    await user.save();
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({user, token, location: user.location});
};

export {register, login, updateUser};