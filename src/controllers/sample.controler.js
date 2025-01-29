import { json } from "express"

const sample = (req,res)=>{
    return res.json({
        name:"PDP"
    })
}

export default sample