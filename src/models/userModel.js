import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },

    email: {
    type:String,
    required: [true, "please provide an email"],
    unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type:Boolean,
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}) 

const User = mongoose.models.users || mongoose.model("users", userSchema);      // || means create model only if it(users) dosent exist already

export default User;