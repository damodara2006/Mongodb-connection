import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const healthcheck = asyncHandler((req,res)=>{
    return res.json(new apiResponse(200,"Everything fine", "Healthcheck passed"))
});

export default healthcheck;