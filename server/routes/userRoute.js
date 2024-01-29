import express from "express"
import {
  test,
  updateUser,
  deleteUser,
  getUserListing,
  getUser,
} from "../controllers/userController.js"
import { validateToken } from "../utils/validateToke.js"

const router = express.Router()

router.get("/test", test)
router.post("/update/profile/:id", validateToken, updateUser)
router.delete("/delete/profile/:id", validateToken, deleteUser)
router.get("/listing/:id", validateToken, getUserListing)
router.get("/getuser/:id", validateToken, getUser)

export default router
