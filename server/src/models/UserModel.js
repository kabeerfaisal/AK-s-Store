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
        required: function () {
            return !this.googleId;
        }
    },
    age: {
        type: Number,
        required: function () {
            return !this.googleId;
        }
    },
    googleId: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    resetPasswordToken: {
        type: String
    }
}, {
    timestamps: true
});

const Users = mongoose.model("User", userSchema);

export default Users