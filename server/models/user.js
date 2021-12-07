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
        const qry = `SELECT username FROM users where username= ?`;
        try {
            const [rows, fields] = await pool.execute(qry, [this.username]);

            if (rows.length == 1) return true;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    // kiem tra mat khau
    async checkIfPasswordCorrect() {
        const qry = `SELECT username FROM users where username= ? and password = ?`;
        try {
            const [rows, fields] = await pool.execute(qry, [
                this.username,
                this.password,
            ]);

            if (rows.length == 1) return true;
        } catch (error) {
            console.log(error);
        }

        return false;
    }
}

module.exports = User;
