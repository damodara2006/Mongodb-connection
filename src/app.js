import express from "express";
import cors from "cors";
import healthcheckRouters from "./routes/healthcheck.routes.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRegister.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

//router
app.use("/healthcheck", healthcheckRouters);
//userRegister
app.use("/register", userRoute);

export default app;
