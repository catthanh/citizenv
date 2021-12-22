const { json } = require("express");
const { end } = require("../config/pool");
const pool = require("../config/pool");
class Citizen {
    constructor(id = "", fullname = "", addressCode = "") {
        this.id = id;
        this.fullname = fullname;
        this.addressCode = addressCode;
    }

    //Lấy ra thông tin người dân trên cả nước
    async getCitizenList() {
        const sql = `SELECT * FROM citizen`;
        try {
            const [rows, fields] = await pool.query(sql);
            //console.log(rows);
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;    
    }


    //Lấy ra thông tin người dân trên 1 tỉnh
    async getCitizenListFromProvince(provinceCode) {
        const sql = `SELECT * FROM citizen c WHERE address_code LIKE ?`;
        try {
            const [rows, fields] = await pool.query(sql, [provinceCode + '%']);
            console.log(rows);
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    //Láy ra thông tin người dân trên 1 thành phố hoặc địa phương
    async getCitizenListFromCity(provinceCode, districtCode) {
        const sql = `SELECT * FROM citizen c
                    WHERE addresss_code LIKE ?`;
        try {
            provinceCode = provinceCode.toString();
            districtCode = districtCode.toString();
            districtID = provinceCode + districtCode;
            const [rows, fields] = await pool.query(sql, [districtID + '%']);
            console.log(rows);
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async getCitizenListFromLastName(lastname) {
        const sql = `SELECT concat(first_name, ' ' ,last_name) as fullname FROM citizen WHERE last_name LIKE ?`;
        try {
            const [rows, fields] = await pool.query(sql, [lastname + '%']);
            if(rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async getCitizenListFromLastName(firstname) {
        const sql = `SELECT concat(first_name, ' ' ,last_name) as fullname FROM citizen WHERE first_name LIKE ?`;
        try {
            const [rows, fields] = await pool.query(sql, [firstname + '%']);
            if(rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async getCitizenInfo(ID) {
        const sql = `SELECT * FROM citizen WHERE id = ?`;
        try {
            const [rows, fields] = await pool.query(sql, [ID]);
            if(rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
    }

    
}

module.exports = Citizen;