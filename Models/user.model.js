const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String
}, {
    versionKey: false
})
const User = mongoose.model("user", userSchema)
module.exports = User;