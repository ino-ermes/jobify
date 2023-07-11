import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, '名前をよこせ！'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'メールがないぞ'],
        validate: {
            validator: validator.isEmail,
            message: '正しいメールを入力してください',
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'パスワード入れ忘れたよ'],
        minlength: 6,
        select: false,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'ラストネーム',
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: '京都',
    },
});

UserSchema.pre('save', async function() {
    if(this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

export default mongoose.model('User', UserSchema);