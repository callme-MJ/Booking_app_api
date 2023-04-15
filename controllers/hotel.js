import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel (req.body)
    try{
        const nwHotel = await newHotel.save();
        res.status(200).json(nwHotel)
    }catch(err){
        next()
    }
}
export const updateeHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHotel)
    }catch(err){
        next()
    }
}
export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
    }catch(err){
        next()
    }
}
export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(err){
        next()
    }
}
export const getHotels = async (req,res,next)=>{
    const {min, max, ...others} =req.query;
    try{
        const hotels = await Hotel.find({...others,
        cheapestPrice:{$gt:min || 1,$lt:max || 200},}).limit(4);
        res.status(200).json(hotels)
    }catch(err){
        next()
    }
}
export const getCountByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }catch(err){
        next()
    }
}
export const getCountByType = async (req,res,next)=>{
    try{
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
    const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"cabin",count:cabinCount},
            {type:"villa",count:villaCount},
            {type:"resort",count:resortCount},
            {type:"apartment",count:apartmentCount},
        ])
}catch(err){
        next()
    }
}
export const getHotelRooms = async (req, res, next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room)=>{
                return Room.findById(room)
            })
            )
            res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}