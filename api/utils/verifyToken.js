import jwt from "jsonwebtoken";
import createError from "./err.js";


export const verifyToken = (req,res,next)=>{
  const token = req.cookies.access_token;
  if(!token){
    return next(createError(401, "you are not authenticate"))
  }

  jwt.verify(token,process.env.JWT,(err, user)=>{
    if (err) return next(createError(401, "token is not valid"))
        req.user = user;
    next();
  });
}

export const verifyUser  = (req,res,next)=>{
  verifyToken(req,res,next, ()=>{
    //this req.user.id is within jwt token, if this condition is match then user is the owner and as well as check is admin
    if (req.user.id === req.params.id || req.user.isAdmin){
      next();
    }else{
      return next(createError(403,"You are not authorized"));
    }
  })
}

export const verifyAdmin  = (req,res,next)=>{
  verifyToken(req,res,next, ()=>{
    //this req.user.id is within jwt token, if this condition is match then user is the owner and as well as check is admin
    if (req.user.isAdmin){
      next();
    }else{
      return next(createError(403,"You are not authorized because you are not admin"));
    }
  })
}