import express from "express";
const router = express.Router();
import { createHotel, deleteHotel, getHotel, getHotels, updateeHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";



router.post("/",verifyAdmin, createHotel);

router.delete("/:id",verifyAdmin, deleteHotel)

router.get("/:id",getHotel)

router.get("/", getHotels)

router.put("/:id",verifyAdmin, updateeHotel)

export default router;