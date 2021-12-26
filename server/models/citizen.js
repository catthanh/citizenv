const pool = require("../config/pool");
class Citizen {
    constructor(id_citizen, quiz_id, answer) {
        this.id_citizen = id_citizen;
        this.quiz_id = quiz_id;
        this.answer = answer;
    }

    static create(citizen = {}) {
        return new this(
            citizen.id_citizen,
            citizen.quiz_id,
            citizen.answer
        );
    }

    static async findOne(citizen = {}) {
        //console.log(user);
        let qry = null;
        if (citizen.id)
            qry = `SELECT * FROM answer where id = ${citizen.id}`;
        if (citizen.id_citizen) 
            qry = `SELECT * FROM answer where id_citizen = ${citizen.id_citizen}`;
        if (citizen.quiz_id)
            qry = `SELECT * FROM answer where address_code = ${citizen.quiz_id}`;
        try {
            const [rows, fields] = await pool.query(qry);
            if (rows.length == 1) {
                return this.create(rows[0]);
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async addData() {
        const qry = `INSERT INTO answer(id_citizen, quiz_id, answer) VALUES(?,?,?)`;
        try {
            const [rows, fields] = await pool.query(qry, [
                this.id_citizen,
                this.quiz_id,
                this.answer,
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }

    async editData(answer) {
        const qry = `UPDATE answer SET answer=? WHERE id_citizen=? and quiz_id=?`;
        try {
            const [rows, fields] = await pool.query(qry, [
                answer,
                this.id_citizen,
                this.quiz_id,
            ]);
            return true;
        } catch (error) {
            return false;
        }
    }

    async delData(id) {
        const qry = `DELETE FROM answer WHERE id=?`;
        try {
            const [rows, fields] = await pool.query(qry, [
                id,
            ]);
            if(rows.length == 1) return true;
        } catch (error) {}
        return false;
    }
}

module.exports = Citizen;