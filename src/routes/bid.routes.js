import { Router } from "express";
import { listing, createBid, insertBid } from "../controllers/bid.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/list").post(verifyJWT, listing)
router.route("/create").post(verifyJWT, createBid)
router.route("/insertBid").post(verifyJWT, insertBid)

export default router;