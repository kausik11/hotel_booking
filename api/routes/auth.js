import express from "express";
import {login, register } from "../controllers/authController.js";
const router = express.Router();


//this first get request for practice use
// router.get('/',(req,res)=>{
//     res.send('Hello, this is auth endpoints');
// })

//this is register endpoints
// router.get('/register',(req,res)=>{
//     res.send('Hello, this is auth register endpoints');
// })

//without using the so called function we use controller to manage the routing and all related functionalities
router.post('/register',register);

router.post('/login',login);
export default router;