import mongoose,{Schema,Document,Types} from "mongoose";


export interface Darama extends Document{
  name: string;
  poster?: string;
  plot?: string;
  ost?: string;
  year: number;
  channel: string;
  NoofEpisodes?: number;
  writers: string[];
  directors: string[];
  producers: string[];
  generes: string[];
  actors: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
    
    
}

const daramaSchema:Schema<Darama> = new Schema({
    name:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    
    plot:{
        type:String,
        
    },
    ost:{
        type:String,
        
    },
    year:{
        type:Number,
        required:true
    },
    channel:{
        type:String,
        required:true
    },
    NoofEpisodes:{
        type:Number,
    },
    writers:[
        {
        type:String,
    },
    ],
    directors:[
        {
        type:String,
    },
    ],
    producers:[
        {
        type:String,
    },
    ],
    generes:[
        {
        type:String,
    },
    ],
    actors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Actor"
        }
    ],
    
    
},{timestamps:true})

const DaramModel = (mongoose.models.Darama as mongoose.Model<Darama>) || (mongoose.model<Darama>("Darama",daramaSchema))

export default DaramModel
