const pool = require("../config/pool");
class Area {
    constructor(
        addressCode,
        name,
        time_begin = null,
        time_end = null,
        time_done = null
    ) {
        this.addressCode = addressCode;
        this.name = name;
        this.time_begin = time_begin;
        this.time_end = time_end;
        this.time_done = time_done;
    }
    static userRoleByAddressCode = (addressCode) => {
        const toString = "" + addressCode;
        switch (toString.length) {
            case 0:
                return "A1";
            case 2:
                return "A2";
            case 4:
                return "A3";
            case 6:
                return "B1";
            case 8:
                return;

            default:
                return "admin";
        }
    };
    static create(area = {}) {
        return new this(
            area.address_code,
            area.name,
            area.time_begin,
            area.time_end,
            area.time_done
        );
    }
    async checkIfAddressCodeExists() {
        const qry = `SELECT id FROM area where id= ?`;
        try {
            console.log("checke2");
            const [rows, fields] = await pool.query(qry, [this.addressCode]);
            console.log("checke3");
            if (rows.length == 1) return true;
        } catch (error) {
            console.log(error);
        }
        console.log("checke4");
        return false;
    }
    async checkIfNameExists() {
        const qry = `SELECT name FROM area where name= ?`;
        try {
            const [rows, fields] = await pool.query(qry, [this.name]);
            if (rows.length == 1) return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    static async createArea(addressCode, name) {
        const qry = `INSERT INTO area(address_code, name) VALUES(?,?)`;
        try {
            const [rows, fields] = await pool.query(qry, [addressCode, name]);
            return rows;
        } catch (error) {
            return error;
        }
    }
    static async findOne(area = {}) {
        console.log(area);
        let qry = null;
        if (area.name) qry = `SELECT * FROM area where name = "${area.name}"`;
        if (area.id) qry = `SELECT * FROM area where id = ${area.id}`;
        if (area.address_code)
            qry = `SELECT * FROM area where address_code = "${area.address_code}"`;
        try {
            const [rows, fields] = await pool.query(qry);
            console.log(rows.length);
            if (rows.length >= 1) {
                return this.create(rows[0]);
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    static async getChildList(addressCode) {
        const qry = `select * from area where address_code like concat("${addressCode}","%") and length(address_code)=length("${addressCode}")+2;`;
        console.log(qry);
        try {
            const [rows, fields] = await pool.query(qry);
            console.log(rows.length);
            if (rows.length >= 1) {
                return rows.map((row) => this.create(row));
            }
        } catch (error) {
            console.log(error);
        }
        return [];
    }
    static async getAreaData(addressCode) {
        let addressCodeString = "" + addressCode;
        let result = [];
        result = await Area.getChildList(addressCode);
        if (addressCodeString.length + 2 < 8)
            for (let v of result) {
                if (v) v.child = await Area.getChildList(v.addressCode);
            }
        if (addressCodeString.length + 4 < 8)
            for (let v of result) {
                for (let v2 of v.child) {
                    if (v2) v2.child = await Area.getChildList(v2.addressCode);
                }
            }
        if (addressCodeString.length + 6 < 8)
            for (let v of result) {
                for (let v2 of v.child) {
                    for (let v3 of v2.child) {
                        if (v3)
                            v3.child = await Area.getChildList(v3.addressCode);
                    }
                }
            }
        return result;
    }
    static async getDetailArea(addressCode) {
        const sql = `SELECT address_code, name from area WHERE address_code = substring(?, 1, 2)
                    OR address_code = substring(?, 1, 4) or address_code = substring(?, 1, 6) OR address_code = substring(?, 1, 8)`;
        try {
            const [rows, fields] = pool.query(sql, [addressCode, addressCode, addressCode, addressCode]);
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }
    //
    async openDeclare(time_begin, time_end) {
        const qry = `update area set time_begin="${time_begin}", time_end="${time_end}" where address_code = "${this.addressCode}"`;
        console.log(qry);
        try {
            const [rows, fields] = await pool.query(qry);
            return rows;
        } catch (error) {
            console.log(error);
        }
        return [];
    }
}
module.exports = Area;
