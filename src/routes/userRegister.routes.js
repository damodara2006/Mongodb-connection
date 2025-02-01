import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {userRegister} from "../controllers/userRegister.js";
import { Avatardelete } from "../controllers/userRegister.js";

const router = Router();

router.route("/UserRegister").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  userRegister,
  
);

router.route("/deleteAvatar").post(Avatardelete)

export default router;