import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        default: ''
    },
    createdTika: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
