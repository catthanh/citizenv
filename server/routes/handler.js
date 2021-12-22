const express = require("express");
const router = express.Router();
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
    const user = await User.findOne({ id: userid });

    if (!user && !user.role === "A1")
        res.json({ status: "error", message: "không được phép" });
    else {
        const a1 = new UserA1(user.username, user.password);
        res.json(await a1.createProvince(addressCode, name));
    }
});

router.put("/api/createaccount", async (req, res) => {
    const { username, role, password, addressCode } = req.body;
    const a1 = new UserA1(username, password);
    res.json(await a1.createAccount(addressCode, role, username, password));
});

router.post("/api/opendeclaration", async (req, res) => {
    const { addressCode, openDeclaration } = req.body;
    const user = await User.findOne({ address_code: addressCode });
    const userA1 = new UserA1(user.username, user.password);
    console.log(user);
    if(user.role === 'A1' || user.role === 'admin') {
        res.json({ status: "ok", message: "full quyền" });
    }
    else if (!userA1.openDeclaration(addressCode))
        res.json({ status: "error", message: "sai tên tài khoản" });
    else if (openDeclaration === "false")
        res.json({ status: "ok", message: "không được cấp" });
    else res.json({ status: "ok", message: "đã cấp thành công" });
});

module.exports = router;
