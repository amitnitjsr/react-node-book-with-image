const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    discount: Number,
    image:String
})

const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel;