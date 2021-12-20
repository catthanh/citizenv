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
            console.log(rows);
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
        const sql = `SELECT * FROM citizen c WHERE address_code LIKE '?%'`;
        try {
            const [rows, fields] = await pool.query(sql, [province]);
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
                    JOIN area_b1 b ON c.address_code = b.id
                    WHERE b.id = ?`;
        try {
            provinceCode = provinceCode.toString();
            districtCode = districtCode.toString();
            districtID = provinceCode + districtCode;
            const [rows, fields] = await pool.query(sql, [districtID]);
            console.log(rows);
            if (rows.length > 0) {
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