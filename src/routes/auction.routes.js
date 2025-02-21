import { Router } from "express";
import { listing } from "../controllers/auction.controller.js";

const router = Router()

router.route("/list").get(listing)

export default router;