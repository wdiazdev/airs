import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"

export const validateToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) return next(errorHandler(401, "Invalid or missing authentication credentials"))

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"))

    req.user = user
    next()
  })
}
