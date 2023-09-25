const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/server.routes');
require('dotenv').config();
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cors())
app.use("/", router)

app.listen(8080, async () => {
    await mongoose.connect("mongodb+srv://alkatrivedi0814:alkatrivedi@cluster0.08hlzdp.mongodb.net/employeedata?retryWrites=true&w=majority")
    console.log("Server started on port 8080")
})