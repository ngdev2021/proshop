import AsyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

 const protect = AsyncHandler(async (req, res, next) => {
    let token;

    // Read JWT token from the cookie
      token = req.cookies.jwt;
    if (token) {
      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user with the decoded id
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
    });

    const admin = (req, res, next) => {
       if (req.user && req.user.isAdmin) {
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
      }
      }

export { protect, admin };

