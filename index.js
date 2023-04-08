import  express  from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
dotenv.config();

const connect = async ()=>{

    try{
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB connected")
    }catch (err){
        console.log(err)
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/roooms", roomsRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(3001, () => {
    connect();
  console.log("Server is running on port 3000");
});