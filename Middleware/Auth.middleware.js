const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');
const AuthMiddlware = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            res.status(404).json({ msg: "Login first!!!" })
            return;
        }
        var decoded = jwt.verify(token, 'shhhhh');
        const isExits = await User.findById(decoded.userId);
        if (!isExits) {
            res.status(404).json({ msg: "wrong token" })
            return;
        }
        next();
        console.log(decoded)

    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Something went wrong" })
    }
}
module.exports = AuthMiddlware;