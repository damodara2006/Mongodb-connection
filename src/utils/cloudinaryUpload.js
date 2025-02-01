import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from "fs"
import dotenv from "dotenv"
import ApiError from './Apierror.js';



// Configuration

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const CloudinaryUpload = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'uploads'
        });
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

const CloudinaryDestroy = async (publicId)=>{
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result
    } catch (error) {
        throw new ApiError(404,error);
    }
}

export{ CloudinaryUpload, CloudinaryDestroy};