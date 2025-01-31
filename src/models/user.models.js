import mongoose, {Schema }from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/* 
id string pk
firstname string
lastname string
email string
password string
   */


 

const userSchema = new Schema({
    id :{
        type: String,
        unique: true,
        required : true
    },
    firstname: {
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        trim:true
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ]
},
{
    timestamps:true  // for created at and updated at date, a simple syntax in mongo DB
}
)
//changing the password to hash value
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10);

    next()
})
//checking the password entered are same comparing with the database pass
userSchema.methods.isPasswordCorrect = async function(password){
    await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password
    },
    process.env.ACCESS_SECRET_KEY,
    {expiresIn: process.env.ACCESS_EXPIRES}
)
}

export const user = moongose.model("user",userSchema)