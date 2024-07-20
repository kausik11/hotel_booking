import User from "../models/Users.js";





export const updateUser = async (req,res,next)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new:true} 
        )
        res.status(200).json(updateUser);
    } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}

export const deleteUser = async (req,res,next)=>{
    try {
        await User.findByIdAndDelete(
             req.params.id
         )
         res.status(200).json("User has been deleted");
     } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}

export const getaUser = async (req,res,next)=>{


    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}

export const getAllUsers = async (req,res,next)=>{
   try {
     const users = await User.find();
     res.status(200).json(users);
   } catch (error) {
    next(error);
   }
}