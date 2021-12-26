const pool = require("../config/pool");
class User {
    constructor(username, password, role = "", address_code = "", id = "") {
        this.username = username;
        this.password = password;
        this.role = role;
        this.address_code = address_code;
    }
    static create(user = {}) {
        return new this(
            user.username,
            user.password,
            user.role,
            user.address_code
        );
    }

    //Tạo user mới
    async createNewUser() {
        const qry = `INSERT INTO users(address_code, role, username, password) VALUES(?,?,?,?)`;
        try {
            console.log('creat user');
            const [rows, fields] = await pool.query(qry, [
                this.addressCode,
                this.role,
                this.username,
                this.password,
            ]);
            return rows;
        } catch (error) {
            return error;
        }
    }

    // kiem tra trung lap
    async checkIfExists() {
        const qry = "SELECT username FROM users where username= ?";
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
    static async findUserById(userid) {
        const qry = `SELECT * FROM users where id= ?`;
        console.log("object");
        try {
            const [rows, fields] = await pool.query(qry, [userid]);
            console.log(rows[0].username);
            if (rows.length == 1) {
                return new User(
                    rows[0].username,
                    rows[0].password,
                    rows[0].role
                );
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    static async findUserByAddressCode(addressCode) {
        const qry = `SELECT * FROM users where address_code= ?`;
        console.log("object");
        try {
            const [rows, fields] = await pool.query(qry, [addressCode]);
            console.log(rows[0].username);
            if (rows.length == 1) {
                return new User(
                    rows[0].username,
                    rows[0].password,
                    rows[0].role
                );
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    static async findOne(user = {}) {
        //console.log(user);
        let qry = null;
        if (user.username)
            qry = `SELECT * FROM users where username = "${user.username}"`;
        if (user.id) qry = `SELECT * FROM users where id = ${user.id}`;
        if (user.address_code)
            qry = `SELECT * FROM users where address_code = ${user.address_code}`;
        try {
            const [rows, fields] = await pool.query(qry);
            console.log(rows.length);
            if (rows.length == 1) {
                return this.create(rows[0]);
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    static async findAll(user = {}) {
        console.log(user);
        let qry = null;
        if (user === {}) qry = `SELECT * FROM users`;
        if (user.username)
            qry = `SELECT * FROM users where username = ${user.username}`;
        if (user.id) qry = `SELECT * FROM users where id = ${user.id}`;
        if (user.address_code)
            qry = `SELECT * FROM users where address_code = ${user.address_code}`;
        try {
            const [rows, fields] = await pool.query(qry);
            console.log(rows[0].role);

            return rows.map((row) => {
                this.create(row);
            });
        } catch (error) {
            console.log(error);
        }
        return [];
    }

    // check if belongto
    // check role this.addresscode.length >= addressCode.length ko quyen
    // lay this.addressCode.length slice so sanh neu hai chuoi trung nhau thi co quyen
    // 11; 1122->11
    checkIfBelongTo(addressCode) {

        if (this.address_code.length >= addressCode.length)
            return false;
        else if (addressCode.slice(0, this.address_code.length) !== this.address_code) {
            console.log(addressCode.slice(0, this.address_code.length))
            return false
        }
        return true;
    }

    //post

    async editUser(id, username, password, role, address_code) {
        const qry = `UPDATE users SET address_code=?,role=?,username=?,password=? WHERE id=?`;
        try {
            const [rows, fields] = await pool.query(qry, [
                address_code,
                role,
                username,
                password,
                id,
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }

    async delUser(id) {
        const qry = `DELETE FROM users WHERE id=?`;
        try {
            const [rows, fields] = await pool.query(qry, [
                id,
            ]);
            if(rows.length == 1) return true;
        } catch (error) {}
        return false;
    }
}

module.exports = User;
