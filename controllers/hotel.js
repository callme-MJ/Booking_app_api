import Hotel from "../models/Hotel.js";

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
    try{
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    }catch(err){
        next()
    }
}