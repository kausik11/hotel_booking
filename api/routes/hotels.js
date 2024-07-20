import express from "express";
import Hotel from '../models/Hotel.js'
const router = express.Router();
import createError from "../utils/err.js";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotelRooms, getaHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";


//create 
router.post('/',verifyAdmin,createHotel);
//we move our functionalities to the controller and import the createhotel function 

    //async(req,res)=>{
// const newHotel = new Hotel(req.body);

//     try {
//         const savedHotel = await newHotel.save();
//         res.status(200).json(savedHotel);
//     } catch (error) {
//         res.status(500).json(error);
//     }
//})



//update
router.put('/:id',verifyAdmin,updateHotel);
// //delete
router.delete('/:id',verifyAdmin,deleteHotel);
// //get a hotel
router.get('/find/:id',getaHotel);


//get all
router.get('/',getAllHotels);
    //async(req,res,next)=>{

    // console.log("hii i am a hotel route")
    //we will work with this type of error handling type later
    //const failed = true;
    //for this part we create a functin in err.js
    // const err = new Error();
    // err.status = 404;
    // err.message = "sorry not found";
    // if (failed) return next(createError(404,"You are not authenticated"));
//     try {
//         const hotels = await Hotel.find();
//         res.status(200).json(hotels);
//     } catch (error) {
//        //res.status(error);
//        next(error);
//     }
// });

//another endpoints to find hotel based on city 
router.get("/countByCity",countByCity)
//another endpoints to find hotel based on type
router.get("/countByType",countByType)
//another endpoints to find room in specific hotel
router.get("/rooms/:id",getHotelRooms)

export default router;