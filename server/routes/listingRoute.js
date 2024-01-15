import express from "express"
import { createListing } from "../controllers/listingController.js"
import { validateToken } from "../utils/validateToke.js"

const router = express.Router()

router.post("/create", validateToken, createListing)

export default router
