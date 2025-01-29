import express from "express"
import cors from "cors"
import healthcheckRouters from "./routes/healthcheck.routes.js"
const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials:true
    })
)
app.use(express.json({limit:"16kb"}))

//router

app.use("/healthcheck",healthcheckRouters)




export default app