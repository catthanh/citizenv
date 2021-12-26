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
            const create = await user.createNewUser();
            console.log(create);
            console.log("created");
            return {
                status: "ok",
                message: "tạo tài khoản thành công",
            };
        }
    }
    // mo quyen khai bao
    async openDeclaration(addressCode) {
        // check role=admin/a1 full quyen

        try {
            const user = await User.findOne({ address_code: addressCode });
            console.log(user);
            if (user)
                return true;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    async editAcc(id, username, password, role, address_code) {

        let user = new User(username, password, role, address_code);
        let province = new Province(address_code, username);
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
            const editUser = user.editUser(id, username, password, role, address_code);
            return {
                status: "ok",
                message: "Sửa tài khoản thành công",
            };
        }
    }
    
    // dong khai bao
    // theo doi tien do
    checkProgress() {}
    //phan tich

    // xem danh sach
    citizenList() {}
    // xem thong tin mot nguoi dan bat ki
    citizenInfo() {}
}

module.exports = UserA1;
