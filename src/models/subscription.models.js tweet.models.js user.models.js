import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    count:{
        type:Number,
        default:0
    }
});

  
 export const Subscription = mongoose.model("Subscription", subscriptionSchema)