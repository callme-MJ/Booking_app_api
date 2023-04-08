import express from "express";
const router = express.Router();
import { deleteUser, getUser, getUsers, updateeUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

router.get("/authenticate",verifyToken, (req,res,next)=>{
    res.send("you are authenticated")
})

router.get("/authorizeuser/:id", verifyUser,(req,res,next)=>{
    res.send("you are authorized")
})

router.get("/authorizeadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("admin authorized")
})

router.delete("/:id",verifyUser, deleteUser)

router.get("/:id",verifyUser, getUser)

router.get("/",verifyAdmin ,getUsers)

router.put("/:id",verifyUser, updateeUser)

export default router;