import express from "express";
import { CreateRoom, deleteRoom, getAllRooms, getaRoom, updateRoom, updateRoomavailability } from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


//create a room
router.post('/:hotelId', verifyAdmin,CreateRoom);
//update room details
router.put("/:id", verifyAdmin,updateRoom);
//delete a room
router.delete("/:id/:hotelId",verifyAdmin,deleteRoom);
//get a room
router.get("/:id",getaRoom);
//get all rooms
router.get("/",getAllRooms);
//update availability of rooms
router.put("/availability/:id",updateRoomavailability)
export default router;  