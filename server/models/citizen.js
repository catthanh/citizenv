const { json } = require("express");
const { end } = require("../config/pool");
const pool = require("../config/pool");
class Citizen {

    //Lấy ra thông tin người dân trên cả nước
    async getCitizenList() {
        const sql = `SELECT * FROM citizen c`;
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
        const sql = `SELECT * FROM citizen c 
                    JOIN answer a ON c.id = a.id_citizen
                    WHERE c.address_code LIKE ?`;
        try {
            const [rows, fields] = await pool.query(sql, [provinceCode + '%']);
            console.log(provinceCode);
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
                    JOIN answer a ON c.id = a.id_citizen
                    WHERE addresss_code LIKE ?`;
        try {
            provinceCode = provinceCode.toString();
            districtCode = districtCode.toString();
            districtID = provinceCode + districtCode;
            const [rows, fields] = await pool.query(sql, [districtID + '%']);
            //console.log(rows);
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    //Láy ra thông tin người dân trên 1 phường, xã
    async getCitizenListFromWard(provinceCode, districtCode, wardCode) {
        const sql = `SELECT * FROM citizen c
                    JOIN answer a ON c.id = a.id_citizen
                    WHERE addresss_code LIKE ?`;
        try {
            provinceCode = provinceCode.toString();
            districtCode = districtCode.toString();
            wardCode = wardCode.toString();
            wardID = provinceCode + districtCode + wardCode;
            const [rows, fields] = await pool.query(sql, [wardID + '%']);
            console.log(rows);
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    //Lấy ra thông tin người dân trên 1 thôn, bản
    async getCitizenListFromArea(provinceCode, districtCode, wardCode, areaCode) {
        const sql = `SELECT * FROM citizen c
                    JOIN answer a ON c.id = a.id_citizen
                    WHERE addresss_code LIKE ?`;
        try {
            provinceCode = provinceCode.toString();
            districtCode = districtCode.toString();
            wardCode = wardCode.toString();
            areaCode = areaCode.toString();
            areaID = provinceCode + districtCode + wardCode + areaCode;
            const [rows, fields] = await pool.query(sql, [areaID]);
            console.log(rows);
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    //Lấy ra số người giới tính nam, giới tính nữ
    async getCitizenListCateByGender(id) {
        const sql = `SELECT COUNT(case when a.answer = 'NAM' then 1 end) as Male, 
                    COUNT(case when a.answer = 'Nữ' then 1 end) as Female 
                    from answer a
                    JOIN citizen c ON c.id = a.id_citizen
                    WHERE c.address_code LIKE ?`;
            try {
                const [rows, fields] = await pool.query(sql, [id + '%']);
                if (rows.length > 0) {
                    return rows;
                }
            } catch (error) {
                console.log(error)
            }
            return null;
    }

    //Lấy ra số người trong các độ tuổi từ 0-12: child, 12-18: teenager, 18-25: pre adult, 25-40: young adult, 
    //40-50: adult, 50-60: pre old, 60+: old 
    async getCitizenListCateByAged(id) {
        const sql = `select count(case when (select birthday(a.id)) between 0 and 12 THEN 1 end) as child,
                    count(case when (select birthday(c.id)) between 12 and 18 THEN 1 end) as teenager,
                    count(case when (select birthday(c.id)) between 19 and 25 THEN 1 end) as pre_adult,
                    count(case when (select birthday(c.id)) between 26 and 40 THEN 1 end) as adult,
                    count(case when (select birthday(c.id)) between 41 and 50 THEN 1 end) as pre_old,
                    count(case when (select birthday(c.id)) between 51 and 60 THEN 1 end) as old_age
                    from answer a
                    RIGHT JOIN citizen c ON a.id_citizen = c.id 
                    where a.quiz_id = 2 and c.address_code LIKE ?`;
        try {
            const [rows, fields] = await pool.query(sql, [id + '%']);
                if (rows.length > 0) {
                    return rows;
                }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    //Lấy ra số người đã tốt nghiệp bậc thpt, đã tốt nghiệp bậc thcs, chưa tốt nghiệp
    async getCitizenListCateByAcademicLevel(id) {
        const sql = `select count(case when a.answer < 9 then 1 end) as notGra,
                    count(case when a.answer >= 9 then 1 end) as secondGra,
		            count(case when a.answer >= 12 then 1 end) as thirdGra
                    from answer a 
                    JOIN citizen c on c.id = a.id_citizen
                    where a.quiz_id = 9 and c.address_code LIKE ?`;
        try {
            if(id !== '0') {
                const [rows, fields] = await pool.query(sql, [id + '%']);
            } else {
                const [rows, fields] = await pool.query(sql, ['%']);
            }
            if (rows.length > 0) {
                return rows;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Lấy thông tin của 1 người dân bất kỳ 
    async getCitizenInfo(citizenid) {
        const sql = `SELECT c.id, CONCAT(first_name, ' ', last_name) as fullname, address_code, q.cauhoi, a.answer FROM citizen c
                    JOIN answer a ON a.id_citizen = c.id
                    JOIN quiz q ON q.id = a.quiz_id
                    WHERE c.id = ?`;
        try {
            const [rows, fields] = await pool.query(sql, [citizenid]);
            //console.log(citizenid);
            console.log(rows);
            //if(rows.length > 0) {
                return rows;
            //}
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    
}

module.exports = Citizen;