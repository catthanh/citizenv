const Province = require("../models/province");
const User = require("../models/user");
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
    createAccount() {}
    // mo quyen khai bao
    openDeclaration() {}
    // theo doi tien do
    checkProgress() {}
    //phan tich

    // xem danh sach
    citizenList() {}
    // xem thong tin mot nguoi dan bat ki
    citizenInfo() {}
}

module.exports = UserA1;
