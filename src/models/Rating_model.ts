import mongoose,{Schema,Types,Document} from "mongoose";


export interface Rating extends Document {
    stars:number;
    review:string;
    darama:Types.ObjectId;
    user:Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


const ratingSchema:Schema<Rating> = new Schema({
    stars:{
        type:Number
    },
    review:{
        type:String
    },
    darama:{
        type:Schema.Types.ObjectId,
        ref:"Darama"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})


export const Rating = (mongoose.models.Rating as mongoose.Model<Rating>) || (mongoose.model<Rating>("Rating",ratingSchema))

