import mongoose, { Schema, Document, Types } from "mongoose";


interface IVote {
  user: Types.ObjectId;
  votedAt: Date;
}


export interface   OST extends Document {
    singer?: string;
    fullName: string;
    link?: string;
    votes?: number;
    votedBy?: IVote[];
    Drama?: Types.ObjectId;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;


}


const ostSchema: Schema<OST> = new Schema({
    singer: {
        type: String,
        trim: true,
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    link: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    Drama:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Darama"
        },
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
    isActive: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


export const OST = (mongoose.models.Ost as mongoose.Model<OST>) || (mongoose.model<OST>("Ost", ostSchema))

