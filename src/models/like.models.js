import monggoose, { Schema } from "mongoose";\

const likeSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    count:{
        type:Number,
        default:0
    }
});

export const like = mongoose.model("like", likeSchema)