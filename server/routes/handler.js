const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserA1 = require("../roles/userA1");
const Citizen = require("../models/citizen");

router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    console.log(user);
    if (!user)
        res.json({ status: "error", message: "tài khoản không tồn tại" });
    else if (user.password != password)
        res.json({ status: "error", message: "sai mật khẩu" });
    else {
        token = await jwt.sign(user.id, process.env.JWT_SECRET);
        res.json({ status: "ok", message: "đăng nhập thành công", token });
    }
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

// router.post("/api/opendeclaration", async (req, res) => {
//     const { userId, addressCode, openDeclaration } = req.body;
    
//     const userLogin = await User.findOne({ id: userId});
//     const userCheck = await User.findOne({ address_code: addressCode });
    
//     console.log(userCheck);
//     if(userCheck.role === 'A1' || userCheck.role === 'admin') {
//         res.json({ status: "ok", message: "full quyền" });
//     } else if (userLogin.checkIfBelongTo(addressCode)) {
//         const userA1 = new UserA1(userCheck.username, userCheck.password);
//         if (!userA1.openDeclaration(addressCode))
//             res.json({ status: "error", message: "sai tên tài khoản" });
//         else if (openDeclaration === "false")
//             res.json({ status: "ok", message: "không được cấp" });
//         else 
//             res.json({ status: "ok", message: "đã cấp thành công" });
//     } else 
//         res.json({ status: "error", message: "Không có quyền cấp" });
    
// });

router.post("/api/opendeclaration", async (req, res) => {
    const { userId, addressCode, openDeclaration } = req.body;
    try {
        const userLogin = await User.findOne({ id: userId});
        const userCheck = await User.findOne({ address_code: addressCode });
        console.log(userCheck);
        if (userCheck.role === 'A1' || userCheck.role === 'admin') {
            res.json({ status: "ok", message: "full quyền" });
        } if (userLogin.checkIfBelongTo(addressCode)) {
            const userA1 = new UserA1(userCheck.username, userCheck.password);
            if (userA1.openDeclaration(addressCode)) {
                if(openDeclaration === "true") {
                    res.json({ status: "ok", message: "đã cấp thành công" });
                }
                else {
                    res.json({ status: "ok", message: "không được cấp" });
                }
            }
        }
    } catch(error) {
        res.json({ status: "error", message: "Không có quyền để cấp" });
    }
});

//data Q&A
router.post("/api/adddata", async (req, res) => {
    const { id_citizen, quiz_id, answer } = req.body;
    try {
        const citizen = new Citizen(id_citizen, quiz_id, answer);
        if(citizen.addData()){
            console.log(citizen);
            res.json({ status: "ok", message: "Thêm thành công" })
        }
    } catch(error) {
        res.json({ status: "error", message: "Thêm không thành công" })
    }
});

router.put("/api/editdata", async (req, res) => {
    const { id_citizen, quiz_id, answer } = req.body;
    try {
        const citizen = new Citizen(id_citizen, quiz_id, answer);
        if(citizen.editData(answer)) {
            console.log(citizen)
            res.json({ status: "ok", message: "Sửa thành công" })
        }
    } catch(error) {
        res.json({ status: "error", message: "Sửa không thành công" });
    }
});

router.delete("/api/deldata", async (req, res) => {
    const { id } = req.body;
    try{
        const citizen = await Citizen.findOne({ id: id });
        console.log(citizen);
        if(citizen.delData(id))
            res.json({ status: "ok", message: "Xóa thành công" })
    }catch(error) {
        res.json({ status: "error", message: "Xóa không thành công" })
    }
    
});

//data user
// router.put("/api/edituser", async (req, res) => {
//     const { id, username, password, role, address_code } = req.body;
//     try {
//         const user = await User.findOne({ id: id });
//         console.log(user);
//         if(user.editUser(id, username, password, role, address_code)) {
//             console.log(user.editUser(id, username, password, role, address_code));
//             res.json({ status: "ok", message: "Sửa tài khoản thành công" })
//         }
//     } catch(error) {
//         res.json({ status: "error", message: "Sửa tài khoản không thành công" });
//     }
// });

router.put("/api/edituser", async (req, res) => {
    const { id, username, password, role, address_code } = req.body;
    const a1 = new UserA1(username, password);
    res.json(await a1.editAcc(id, username, password, role, address_code));
});

router.delete("/api/deluser", async (req, res) => {
    const { id } = req.body;
    try{
        const user = await User.findOne({ id: id });
        console.log(user);
        if(user.delUser(id))
            res.json({ status: "ok", message: "Xóa tài khoản thành công" })
    }catch(error) {
        res.json({ status: "error", message: "Xóa tài khoản không thành công" })
    }
    
});

module.exports = router;
