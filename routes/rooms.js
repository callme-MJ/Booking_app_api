import express from "express";
const router = express.Router();
import { createRoom, deleteRoom, getRoom, getRooms, updateeRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";



router.post("/:hotelid",verifyAdmin, createRoom);

router.put("/:id",verifyAdmin, updateeRoom)

router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

router.get("/:id",getRoom)

router.get("/", getRooms)


export default router;