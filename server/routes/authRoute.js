import express from "express";
import {
  signIn,
  signUp,
  signOut,
  googleAuth,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/googleauth", googleAuth);
router.get("/signout", signOut);

export default router;
