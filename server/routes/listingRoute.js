import express from "express"
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getSearchListing,
} from "../controllers/listingController.js"
import { validateToken } from "../utils/validateToke.js"

const router = express.Router()

router.post("/create", validateToken, createListing)
router.delete("/delete/:id", validateToken, deleteListing)
router.patch("/update/:id", validateToken, updateListing)
router.get("/getListing/:id", getListing)
router.get("/searchListing", getSearchListing)

export default router
