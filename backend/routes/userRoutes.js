import express from "express";
const router = express.Router();
import { authUser, getUserProfile,registerUser, updateUserProfile,forgotPasswordMail } from "../controllers/userController.js"
import {protect} from '../middleware/authMiddleware.js';


router.route('/').post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect,getUserProfile);
router.route("/profile").put(protect,updateUserProfile);
router.route("/resetmail").post(forgotPasswordMail);
export default router;
