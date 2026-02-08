import mongoose, { Schema, Document, Types } from "mongoose";
import { string } from "zod";


interface IVote {
  user: Types.ObjectId;
  votedAt: Date;
}


export interface ActorType extends Document {
    username: string;
    fullName: string;
    img?: string;
    votes?: number;
    role?:string;
    votedBy?: IVote[];
    popularDaramas?: Types.ObjectId[];
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;


}


const actorSchema: Schema<ActorType> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    img: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    popularDaramas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Darama"
        }
    ],
    votedBy: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            votedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    votes: {
        type: Number,
        default: 0
    },
    role:{
        type:String
    },
    isActive: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


export const Actor = (mongoose.models.Actor as mongoose.Model<ActorType>) || (mongoose.model<ActorType>("Actor", actorSchema))

