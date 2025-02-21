import { Router } from "express";
import { registerUser, listing, login } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route("/register").post(
//     upload.fields([
//         {
//             name:"avatar",
//             maxCount:1
//         },
//     ]),
//     registerUser
// )
router.route("/register").post(registerUser)
// router.route("/list").get(listing)
router.route("/login").post(login)

// secure rotes
router.route("/list").get(verifyJWT, listing)

export default router;