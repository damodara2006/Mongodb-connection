import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apierror.js";
import User from "../models/user.models.js";
import {CloudinaryUpload} from "../utils/cloudinaryUpload.js";
import {CloudinaryDestroy} from "../utils/cloudinaryUpload.js";
import apiResponse from "../utils/apiResponse.js";


const userRegister = asyncHandler(async (req, res) => {
    const { username, firstname, lastname, age, email, password } = req.body;
    
    if ([username, firstname, lastname, email, password].some(field => typeof field === 'string' && field.trim() === "")) {
        throw new ApiError(400, "All fields need to be filled");
    }
    
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (existedUser) {
        throw new ApiError(405, "User already existed");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    console.warn("avatar")

    console.log(avatarLocalPath)
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    // Assuming CloudinaryUpload is a function that uploads the image and returns the URL
    let avatarUrl;
    try {
         avatarUrl = await CloudinaryUpload(avatarLocalPath);
        
    } catch (error) {
        throw new ApiError(404 , "Avatar not uploaded")
    }

    const coverImageUrl = coverImageLocalPath ? await CloudinaryUpload(coverImageLocalPath) : null;
    const newUser = new User({
        username,
        firstname,
        lastname,
        age,
        email,
        password,
        avatar: avatarUrl,
        coverImage: coverImageUrl
    });

    await newUser.save();

    
    res.status(201).json( new apiResponse(201, "User registered successfully", newUser));

});

const Avatardelete =  asyncHandler( async (req,res)=>{
    let {public_id} = req.body;
    console.log(public_id);
    if(!public_id) throw new ApiError(400,"Public id required");
    try{
        const deleteavatar = await CloudinaryDestroy(public_id);
        return res.status(200).json({
            message:"Deleted successfully",
           deleteavatar
        })
    }
    catch(error){
       throw new ApiError(404);
    }
  })




export {userRegister, Avatardelete } ;