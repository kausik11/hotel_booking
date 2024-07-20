//as because default export we can use any name at the time of import
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import createError from "../utils/err.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

//register function
export const register = async (req,res,next)=>{
    try {
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(req.body.password, salt);
        //const {nmae,email,password} = req.body;
        const newuser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })
        // if (User.findOne({email:req.body.email})) {
        //     res.send("User already exists")
        // }
      await newuser.save()
      res.status(201).send('user has been created')

    } catch (error) {
        next(error)
    }
    
}

//login function
export const login = async (req,res,next)=>{
    try {
       const user = await User.findOne({username: req.body.username})
       //it is a custom error function where it will return an error if the user is not register yet
         if (!user) return next(createError(404,"user not found"))


      //if there is no any error we have to check the password with the hash password to match or not
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect) return next(createError(404,"password is not matched"))

       
    //if password is correct we create a jwt token
    const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT);


      //we are not return the password anymore on successful login fulfiled by destructuring
      const {password,isAdmin, ...otherDetails} = user._doc;

       //if all  things are okay we will return our user details
       res
       .cookie("access_token", token,{
        httpOnly: true,
      })
      .status(200)
      .send({details:{...otherDetails},isAdmin});
    } catch (error) {
        next(error)
    }
    
}