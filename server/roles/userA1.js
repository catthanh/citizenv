const Province = require("../models/province");
const User = require("../models/user");
const Citizen = require("../models/citizen");
class UserA1 extends User {
    constructor(username, password) {
        super(username, password, "A1");
    }

    // kkhai bao va cap ma cho tinh
    async createProvince(addressCode, name) {
        console.log("creating");
        let province = new Province(addressCode, name);
        if (await province.checkIfAddressCodeExists())
            return {
                status: "error",
                message: "mã tỉnh đã tồn tại",
            };
        else if (await province.checkIfNameExists())
            return {
                status: "error",
                message: "tên tỉnh đã tồn tại",
            };
        else {
            const create = await province.createProvince();
            console.log(create);
            return {
                status: "ok",
                message: "tạo tỉnh mới thành công",
            };
        }
    }
    // cap tai khoan
    async createAccount(addressCode, role, username, password) {
        let user = new User(username, password, role, addressCode);
        let province = new Province(addressCode, username);
        if (await user.checkIfExists()) {
            console.log("error create");
            return {
                status: "error",
                message: "tên tài khoản đã tồn tại",
            };
        } else if (!(await province.checkIfNameExists())) {
            return {
                status: "error",
                message: "tên tài khoản phải trùng tên tỉnh/thành phố",
            };
        } else {
            const create = await user.createUser();
            console.log(create);
            console.log("created");
            return {
                status: "ok",
                message: "tạo tài khoản thành công",
            };
        }
    }
    // mo quyen khai bao
    static async openDeclaration(addressCode) {
        // check role=admin/a1 full quyen

        try {
            if (await User.findUserByAddressCode(addressCode)) return true;
        } catch (error) {
            console.log(error);
        }

        return false;
    }
    // dong khai bao
    // theo doi tien do
    checkProgress() {}
    //phan tich

    //xem danh sach
    async citizenList() {
        let citizen = new Citizen();
        const data = await citizen.getCitizenList();
        //console.log(data);
        return data;
    }

    // xem danh sach tren 1 tinh
    async citizenListFromProvince(province) {
        // let citizen = new Citizen();
        const data = await Citizen.getCitizenListFromProvince(province);
        return data;
    }

    async citizenListFromCity(province, district) {
        // let citizen = new Citizen();
        const data = await Citizen.getCitizenListFromCity(province, district);
        console.log(data);
        return data;
    }

    async citizenListFromWard(province, district, ward) {
        let citizen = new Citizen();
        const data = await Citizen.getCitizenListFromWard(province, district, ward);
        console.log(data);
        return data;
    }

    async citizenListFromArea(province, district, ward, area) {
        // let citizen = new Citizen();
        const data = await Citizen.getCitizenListFromWard(province, district, ward, area);
        console.log(data);
        return data;
    }

    // xem thong tin mot nguoi dan bat ki
    async citizenInfo(citizen_id) {
        // let citizen = new Citizen();
        const data = await Citizen.getCitizenInfo(citizen_id);
        //console.log(data);
        return data;
    }
}

module.exports = UserA1;
