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
      statusCode: 200,
      message: "Listing deleted successfully.",
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)

  if (!listing) {
    return next(errorHandler(404, "Listing not found."))
  }

  if (req.user.id !== listing.userId) {
    return next(errorHandler(401, "User not authorized."))
  }

  try {
    const updateListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })

    const response = {
      success: true,
      statusCode: 200,
      message: "Listing updated successfully.",
      data: updateListing,
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return next(404, "Listing not found")
    }

    const { __v, createdAt, updatedAt, ...rest } = listing?._doc

    const response = {
      success: true,
      statusCode: 200,
      message: "Listing found.",
      data: rest,
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const getAllListing = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9
    const startIndex = parseInt(req.query.startIndex) || 0
    const searchTerm = req.query.searchTerm || ""
    const sort = req.query.sort || "createdAt"
    const order = req.query.order || "desc"

    let offer = req.query.offer

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] }
    }

    let furnished = req.query.furnished

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] }
    }

    let parking = req.query.parking

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] }
    }

    let listingType = req.query.type

    if (listingType === undefined || listingType === "false") {
      listingType = { $in: ["sale", "rent"] }
    }

    const listings = await Listing.find({
      address: { $regex: searchTerm, $options: "i" },
      // furnished,
      parking,
      listingType,
      offer,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex)

    const response = {
      success: true,
      statusCode: 200,
      message: "Listings found.",
      data: listings,
    }

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
