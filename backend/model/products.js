const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ["foods", "drinks", "sweets", "fruits"]
    },
    price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
