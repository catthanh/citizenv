const pool = require("../config/pool");
class Province {
    constructor(addressCode, name) {
        this.addressCode = addressCode;
        this.name = name;
    }
    async checkIfAddressCodeExists() {
        console.log("checke1");
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

    async createProvince() {
        const qry = `INSERT INTO area(address_code, name) VALUES(?,?)`;
        try {
            const [rows, fields] = await pool.query(qry, [
                this.addressCode,
                this.name,
            ]);
            return rows;
        } catch (error) {
            return error;
        }
    }

    async getProvinceInfo() {
        const sql = `SELECT address_code FROM area WHERE CHAR_LENGTH(address_code) = 2`;
        try {
            const [rows, fields] = await pool.query(qry);
            return rows;
        } catch (error) {
            return error;
        }
    }

    // check if belongto
    // check role this.addresscode.length >= addressCode.length ko quyen
    // lay this.addressCode.length slice so sanh neu hai chuoi trung nhau thi co quyen
    // 11; 1122->11
    checkIfBelongTo(provinceCode, cityCode) {
        if(provinceCode.length >= cityCode.length) {
                var n = provinceCode.length - cityCode.length;
                if(provinceCode.localeCompare(cityCode.slice(0, n) == 0)) {
                    return true;
                } else {
                    return false;
                }
        } else if(provinceCode.length <= cityCode.length) {
            return false;
        }
    }  
    


        
}
module.exports = Province;
