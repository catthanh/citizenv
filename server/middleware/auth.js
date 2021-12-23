const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const user = await User.findOne({
            id: data.id,
        });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({
            status: "error",
            message: "Không có quyền truy cập",
        });
    }
};
module.exports = auth;
