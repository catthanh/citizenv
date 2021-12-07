const express = require("express");
const router = express.Router();
const pool = require("../config/pool");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/api/register", async (req, res) => {
  console.log(req.body);
  const user_name = req.body.user_name;
  const plainPassword = req.body.password;
  const full_name = req.body.full_name;
  const hashPass = await bcrypt.hash(plainPassword, 10);
  console.log(hashPass);
  pool.getConnection((err, conn) => {
    try {
      const qry = `INSERT INTO users(user_name, password, full_name) values(?,?,?)`;
      conn.query(qry, [user_name, hashPass, full_name], (err, result) => {
        conn.release();
        if (err) {
          if (err.errno == 1062) {
            res.end(JSON.stringify({ status: "error", data: "duplicated" }));
          } else console.log(err);
        }
        res.json({ status: "ok", data: "successfully" });
      });
    } catch (err) {
      res.json({ status: "error", data: "sql sever error" });
    }
  });
});

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  let user = new User(username, password);
  const exist = await user.checkIfExists();
  console.log(exist);
  // if (await !user.checkIfExists())
  //   res.json({ status: "error", message: "tài khoản không tồn tại" });
  // else if (await !user.validatePassword())
  //   res.json({ status: "error", message: "sai mật khẩu" });
  // else res.json({ status: "ok", message: "đăng nhập thành công" });
});

module.exports = router;
