import mongoose,{Schema,Document,Types} from "mongoose";


export interface DaramaType extends Document{
  id: Types.ObjectId;
  name: string;
  poster?: string;
  plot?: string;
  ost?: Types.ObjectId;
  year: number;
  channel: string;
  NoofEpisodes?: number;
  writers: Types.ObjectId[];
  directors: Types.ObjectId[];
  producers: Types.ObjectId[];
  genres: string[];
  actors: Types.ObjectId[];
  female_actors: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
    
    
}

const daramaSchema:Schema<DaramaType> = new Schema({
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
            type:mongoose.Schema.Types.ObjectId,
            ref:"Producer"
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
            type:mongoose.Schema.Types.ObjectId,
            ref:"Writer"
        }
    ],
    directors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Director"
        }
    ],
    producers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Producer"
        }
    ],
    genres:[
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
    female_actors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Actor"
        }
    ],
    
    
},{timestamps:true})

export const Darama = (mongoose.models.Darama as mongoose.Model<DaramaType>) || (mongoose.model<DaramaType>("Darama",daramaSchema))


