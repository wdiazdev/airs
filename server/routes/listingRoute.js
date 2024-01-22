import express from "express"
import { createListing, deleteListing, updateListing } from "../controllers/listingController.js"
import { validateToken } from "../utils/validateToke.js"

const router = express.Router()

router.post("/create", validateToken, createListing)
router.delete("/delete/:id", validateToken, deleteListing)
router.patch("/update/:id", validateToken, updateListing)

export default router
