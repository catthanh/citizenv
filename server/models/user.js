const pool = require("../config/pool");
class User {
  constructor(username, password, role = "", address_code = "") {
    this.username = username;
    this.password = password;
    this.user_role = role;
    this.address_code = address_code;
  }

  // kiem tra trung lap
  async checkIfExists() {
    await pool.getConnection(async (err, conn) => {
      try {
        const qry = `SELECT username FROM users where username= ?`;
        conn.query(qry, [this.username], async (err, result) => {
          console.log(result.length);
          if (result.length == 1) return true;
          else return false;
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  // kiem tra mat khau
  async validatePassword() {
    pool.getConnection((err, conn) => {
      try {
        const qry = `SELECT password FROM users where username= ? and password = ?`;
        conn.query(qry, [this.username, this.password], (err, result) => {
          console.log(result);
          if (result.length == 1) return true;
          else return false;
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}

module.exports = User;
