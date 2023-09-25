const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    FirstName: String,
    LastName:String,
    Email:String,
    Department: { type: String, enum: ["Tech","Marketing","Operations"] },
    Date: { type: Date, default: Date() },
    Salary: Number
}, {
    versionKey: false
})
const Employee = mongoose.model("employee", employeeSchema)
module.exports = Employee