const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        isLength : 6
    },
    number :{
        type: Number,
        required: true,
        isLength : 10
    }
});

module.exports = mongoose.model("user", userSchema);