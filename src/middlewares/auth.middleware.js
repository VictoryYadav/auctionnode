import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import constants from '../constants.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header
    // console.log(req.headers.authorization)
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, constants.JWT_SECRET_KEY);
        next(); // Move to the next middleware
    } catch (error) {
        res.status(403).json({ message: "Invalid token." + error });
    }
})