import express from "express";
import { deleteUser, getAllUsers, getaUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();



// router.get("/checkauthentication",verifyToken, (req,res,next)=>{
//     res.send("hello user you are logged in");
// })

// router.get("/checkuser/:id",verifyUser, (req,res,next)=>{
//     res.send("hello user you are logged in and you can delete your account");
// })
// router.get("/checkadmin/:id",verifyAdmin, (req,res,next)=>{
//     res.send("hello admin you are logged in and you can delete all account");
// })

//Update
router.put("/:id",verifyUser, updateUser);
//Delete
router.delete("/:id", verifyUser ,deleteUser);
//Get a user
router.get("/:id", verifyUser ,getaUser);
//Get all user
router.get("/",verifyAdmin ,getAllUsers);
export default router;