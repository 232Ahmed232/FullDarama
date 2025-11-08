import mongoose,{Schema,Document, Types} from "mongoose";


export interface Actor extends Document{
    username:string;
    fullName:string;
    img?:string;
    votes?:number;
    popularDaramas: Types.ObjectId;
    isActive:boolean;
    createdAt?: Date;
    updatedAt?: Date;
    
    
}


const actorSchema:Schema<Actor> = new Schema({
     username:{
        type:String,
        required :true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    
    fullName:{
        type:String,
        required :true,
        trim:true,
        index:true      
    },

    img:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    popularDaramas:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Darama"
        }
    ],


    votes:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


const actorModel = (mongoose.models.Actor as mongoose.Model<Actor>) || (mongoose.model<Actor>("Actor",actorSchema))

export default actorModel