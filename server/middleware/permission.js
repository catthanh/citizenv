const UserController = require("../controllers/user.controller");

const permission = async (req, res, next) => {
    const user = req.user;

    try {
        if (
            !UserController.checkPermission(
                user.address_code,
                req.body.addressCode
            )
        ) {
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).send({
            status: "error",
            message: "bạn không có quyền thao tác",
        });
    }
};
module.exports = permission;
