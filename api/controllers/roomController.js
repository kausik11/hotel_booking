import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import createError from "../utils/err.js";

export const CreateRoom = async(req,res,next)=>{

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms : savedRoom._id}})
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}


export const updateRoom = async (req,res,next)=>{
    try {
        const updateroom = await Room.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new:true} 
        )
        res.status(200).json(updateroom);
    } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}


export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(
             req.params.id
         )
         try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms: req.params.id},
            });
         } catch (error) {
            next(error);
         }
         res.status(200).json("Room has been deleted");
     } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}


export const getaRoom = async (req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room);
    } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}


export const getAllRooms = async (req,res,next)=>{
   try {
     const rooms = await Room.find();
     res.status(200).json(rooms);
   } catch (error) {
    next(error);
   }
}

export const updateRoomavailability = async(req,res,next)=>{
try {
    await Room.updateOne({"roomNumber._id": req.params.id},{
        $push:{
            "roomNumber.$.unavailableDates": req.body.dates
        }
    })
    res.status(200).json("Room status has been updated")
} catch (error) {
    next(error)
}
}