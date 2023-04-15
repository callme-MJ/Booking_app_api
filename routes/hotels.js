import express from "express";
const router = express.Router();
import { createHotel, deleteHotel, getCountByCity, getCountByType, getHotel, getHotelRooms, getHotels, updateeHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";



router.post("/",verifyAdmin, createHotel);

router.delete("/:id",verifyAdmin, deleteHotel)

router.get("/find/:id",getHotel)

router.get("/", getHotels)
router.get("/countByCity", getCountByCity)
router.get("/countByType", getCountByType)
router.get("/room/:id", getHotelRooms)

router.put("/:id",verifyAdmin, updateeHotel)

export default router;