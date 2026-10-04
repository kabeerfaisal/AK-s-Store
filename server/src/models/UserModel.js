import { default as mongoose } from "mongoose";


let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum:["user", "admin"],
        default: "user"
    }
},{
    timestamps: true
});

export default mongoose.model("User", userSchema);