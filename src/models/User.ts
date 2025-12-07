import mongoose, { Schema, Document, Types } from "mongoose";








export interface User extends Document {
    username: string;
    email: string;
    fullName: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    rating?: Types.ObjectId[];
    isVotedActor?:boolean;
    isVotedFemaleActor?:boolean;
    isVotedDirector?:boolean;
    isVotedWriter?:boolean;
    isVotedOst?:boolean;
    createdAt?: Date;
    updatedAt?: Date;

}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please provide valid email"]
    },
    
    password: {
        type: String,
        required: [true, "Passwored is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "VerifyCode is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "VerifyCode is required"]
    },
    rating: [
        {
            type: Schema.Types.ObjectId,
            ref: "Rating"
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    },

    isVotedActor:{
        type:Boolean,
        default:false
    },
    isVotedFemaleActor:{
        type:Boolean,
        default:false
    },
    isVotedDirector:{
        type:Boolean,
        default:false
    },
    isVotedWriter:{
        type:Boolean,
        default:false
    },
    isVotedOst:{
        type:Boolean,
        default:false
    },



}, { timestamps: true })


export const User = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema))


