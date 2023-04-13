import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const register = async (req,res,next)=>{
    try {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(200).send("User has been created")
    } catch (err) {
        next(err)
    }
}

export const login = async (req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if (!user) return next(createError(404,"user not found"))

        const isPasswordCorect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorect) return next (createError(404, "incorrect credentials"))

        const token = jwt.sign({id:user.id, isAdmin:user.isAdmin},process.env.JWT)
        const {password, isAdmin, ...details} = user._doc
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(details);
    } catch (err) {
        next(err)
    }
}

