import mongoose, { Schema } from "moongose"


const videoSchema = new Schema(
    {
        videFile:{
            type:String,
            required:true
        },
        duaration:{
            type:Number,
            required:true
        },
        likes:{
            type:Number,
            default:0
        },
        comments:{
            type:String,
            default:null
        },
        description:{
            type:String,
            default:null
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }

    }
)

export const video = mongoose.model("Video",videoSchema)