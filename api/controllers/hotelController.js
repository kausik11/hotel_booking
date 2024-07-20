import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}

export const updateHotel = async (req,res,next)=>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new:true} 
        )
        res.status(200).json(updateHotel);
    } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}

export const deleteHotel = async (req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(
             req.params.id
         )
         res.status(200).json("Hotel has been deleted");
     } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}

export const getaHotel = async (req,res,next)=>{


    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    } catch (error) {
        //as for now we send the error using next to middleware
        next(error);
    }
}

//now we are adding query parameters while we find the hotel Hotel.find()
export const getAllHotels = async (req,res,next)=>{
    const {min,max,...others} = req.query;
    const limit = parseInt(req.query.limit); 
   try {
    // here i am unable use the limit for our request
    //  const hotels = await Hotel.find(req.query);
    //  console.log(limit);
    const hotels = await Hotel.find({...others,  cheapestPrice:{$gt:min || 1, $lt:max || 999}}).limit(4);
     res.status(200).json(hotels);
   } catch (error) {
    next(error);
   }
}

//here when we are use this controllers countbycity we are going to use query as example
//http://localhost:8800/api/hotels/countByCity?cities=berlin,london,madrid
export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
   try {
    const list = await Promise.all(cities.map(city=>{
        return Hotel.countDocuments({city:city})
    }))
     res.status(200).json(list);
   } catch (error) {
    next(error);
   }
}
export const countByType = async (req,res,next)=>{
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabin",count:cabinCount},
        ])
    } catch (error) {
       next(error);
    }

  
}

//find a room in a specific hotel
export const getHotelRooms = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }));
        res.status(200).json(list)
    } catch (error) {
        next(error);
    }
}

