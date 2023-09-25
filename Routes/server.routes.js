const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Employee = require('../Models/employee')
const User = require('../Models/user.model');
const AuthMiddlware = require('../Middleware/Auth.middleware');
router.get("/", (req, res) => {
    res.send("Welcome to employee Appointment App")
})
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hash = bcrypt.hashSync(password, 2);
        const user = User({ email, password: hash });
        await user.save();
        res.json({ msg: "User registered succesfully", user });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Something went wrong", error })
    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExits = await User.findOne({ email });
        if (!isExits) {
            res.status(404).json({ msg: "User doesn't exist with this email" });
            return;
        }
        bcrypt.compare(password, isExits.password, function (err, result) {
            if (err) {
                console.log(err)
                res.status(404).json({ msg: "Something went wrong", err })
                return;
            }
            if (result) {
                var token = jwt.sign({ userId: isExits._id }, 'shhhhh');
                // token =userid+secret key 
                res.json({ token });
            }
            else {
                res.status(404).json({ msg: "wrong password" })
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Something went wrong", error })
    }
})


router.get("/employees", AuthMiddlware, async (req, res) => {
    const { search, filter, sort } = req.query;
    try {
        if (search) {
            const employee = await Employee.find({ name: { $regex: search, $options: "i" } });
            res.json({ employee })
        }
        if (filter && sort) {
            const employee = await Employee.find({ specialization: filter }).sort({
                date: sort
            });
            res.json({ employee })
        }
        else if (filter) {
            const employee = await Employee.find({ specialization: filter });
            res.json({ employee })
        }
        else if (sort) {
            const employee = await Employee.find().sort({
                date: sort
            });
            res.json({employee})
        }
        else {
            const employee = await Employee.find();
            res.json({ employee})
        }
        // res.json(appointments);
    } catch (error) {
        res.status(404).json({ msg: "Something went wrong", error })

    }
})
router.post("/employees", AuthMiddlware, async (req, res) => {
    const { FirstName, LastName, Email,Department, Salary} = req.body;
    try {
        const employee = new Employee({ FirstName, LastName, Email,Department, Salary })
        await employee.save();
        res.json({ employee });

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Something went wrong", error })
    }
})
router.patch("/employees/:id", AuthMiddlware, async (req, res) => {
    const { id } = req.params;
    try {
        const editemployee = await Employee.findByIdAndUpdate(id, req.body);
        res.json({ editemployee })
    } catch (error) {
        res.status(404).json({ msg: "Something went wrong", error })

    }
})
router.delete("/employees/:id", AuthMiddlware, async (req, res) => {
    const { id } = req.params;
    try {
        const deleteemployee = await Employee.findByIdAndUpdate(id);
        res.json({ deleteemployee })
    } catch (error) {
        res.status(404).json({ msg: "Something went wrong", error })

    }
})
module.exports = router
