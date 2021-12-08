const express = require("express");
const router = express.Router();
const pool = require("../config/pool");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserA1 = require("../roles/userA1");

router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    let user = new User(username, password);
    if (!(await user.checkIfExists()))
        res.json({ status: "error", message: "tài khoản không tồn tại" });
    else if (!(await user.checkIfPasswordCorrect()))
        res.json({ status: "error", message: "sai mật khẩu" });
    else res.json({ status: "ok", message: "đăng nhập thành công" });
});

router.put("/api/createprovince", async (req, res) => {
    const { userid, addressCode, name } = req.body;
    const user = await User.findUserById(userid);
    console.log(user);
    if (!user && !user.role === "A1")
        res.json({ status: "error", message: "không được phép" });
    else {
        const a1 = new UserA1(user.username, user.password);
        res.json(await a1.createProvince(addressCode, name));
    }
});

module.exports = router;
