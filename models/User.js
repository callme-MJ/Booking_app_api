import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},{timestamps:true});

export default mongoose.model("User", UserSchema);