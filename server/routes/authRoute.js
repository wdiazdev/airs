import express from "express";
import { signIn, signUp, googleAuth } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/googleauth", googleAuth);

export default router;
