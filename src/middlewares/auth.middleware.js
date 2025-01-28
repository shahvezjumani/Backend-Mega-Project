import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
try {
  console.log("In middle ware");
  
      const token =
        req.cookies?.accessToken ||
        req.header("Authorizaton")?.replace("Bearer ", "");

        console.log("after token");
        
    
      if (!token) {
        throw new ApiError(401, "unauthorized request");
      }
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log("TOkec",token);
    
    
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("kena",decodedToken);
      
    
      const user = User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
      console.log("after decoed");
      
    
      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }
    
      req.user = user;
      next();
} catch (error) {
    console.log("errorrrr",error);
    
}
});

export {verifyJWT}
