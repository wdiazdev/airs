import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body)

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Listing created successfully",
      listing,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)

  if (!listing) {
    return next(errorHandler(404, "Listing not found."))
  }

  if (req.user.id !== listing.userId) {
    return next(errorHandler(401, "User not authorized."))
  }

  try {
    await Listing.findByIdAndDelete(req.params.id)

    const response = {
      success: true,
      statusCode: 201,
      message: "Listing deleted successfully.",
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
