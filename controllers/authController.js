import User from '../models/User.js';
import {BadRequestError, UnauthenticatedError} from '../errors/index.js';
import {StatusCodes} from 'http-status-codes';
import attachCookie from '../utils/attachCookie.js';

const register = async (req, res) => {
    const {email, name, password} = req.body;
    if(!email && !name && !password) {
        throw new BadRequestError('何も記入しないですが。。。');
    }
    const user = await User.create(req.body);
    const token = user.createJWT();

    attachCookie({res, token});

    res.status(StatusCodes.OK)
    .json({
        user: {
            name: user.name,
            email: user.email,
            lastname: user.lastname,
            location: user.location,
            id: user._id,
        },
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
    attachCookie({res, token});

    user.password = undefined;
    res.status(StatusCodes.OK).json({user, location: user.location});
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
    attachCookie({res, token});

    res.status(StatusCodes.OK).json({user, location: user.location});
};

const getUserInfo = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId});
    res.status(StatusCodes.OK).json({user, location: user.location});
};

const logoutUser = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({msg: '働かざる者は食うべからず'});
}

export {getUserInfo, logoutUser, register, login, updateUser};