import healthcheck from "../controllers/healthcheck.controller.js"
import { Router } from "express";
import sample from "../controllers/sample.controler.js"

const router = Router()

router.route("/").get(healthcheck);
router.route('/sample').get(sample);

export default router;