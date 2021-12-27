const Area = require("../models/area.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { getAreaData } = require("../models/area.model");
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    const address_code = user.address_code;
    const area = await Area.findOne({ address_code });
    console.log(area);
    if (!user)
        res.json({ status: "error", message: "tài khoản không tồn tại" });
    else if (user.password != password)
        res.json({ status: "error", message: "sai mật khẩu" });
    else {
        token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        const { password, id, ..._user } = user;
        res.json({
            status: "ok",
            message: "đăng nhập thành công",
            token,
            ..._user,
            ...area,
            child: await getAreaData(address_code),
        });
    }
};
exports.checkPermission = (parentCode, childCode) => {
    const parentCodeString = "" + parentCode;
    const childCodeString = "" + childCode;
    if (parentCodeString.length > childCodeString.length - 2) return false;
    if (childCodeString.slice(0, -2) !== parentCodeString) return false;
    return true;
};

exports.createArea = async (req, res) => {
    const { addressCode, name, password, user } = req.body;
    const area = await Area.findOne({ id: addressCode });

    if (area)
        res.json({
            status: "error",
            name: "addressCode",
            message: "mã tỉnh đã tồn tại",
        });
    else if (await Area.findOne({ name: name }))
        res.json({
            status: "error",
            name: "name",
            message: "tên tỉnh đã tồn tại",
        });
    else {
        const create = await Area.createArea(addressCode, name);
        const account = await User.createUser(
            addressCode,
            Area.userRoleByAddressCode(addressCode),
            addressCode,
            password
        );
        res.json({
            create,
            account,
            status: "ok",
            message: "tạo tỉnh mới và cấp tài khoản thành công",
        });
    }
};
// cap tai khoan
// async createAccount(addressCode, role, username, password) {
//     let user = new User(username, password, role, addressCode);
//     let province = new Area(addressCode, username);
//     if (await user.checkIfExists()) {
//         console.log("error create");
//         return {
//             status: "error",
//             message: "tên tài khoản đã tồn tại",
//         };
//     } else if (!(await province.checkIfNameExists())) {
//         return {
//             status: "error",
//             message: "tên tài khoản phải trùng tên tỉnh/thành phố",
//         };
//     } else {
//         const create = await user.createUser();
//         console.log(create);
//         console.log("created");
//         return {
//             status: "ok",
//             message: "tạo tài khoản thành công",
//         };
//     }
// }
// // mo quyen khai bao
exports.openDeclaration = async (req, res) => {
    let body = req.body;
    console.log(body);
    const area = await Area.findOne({ address_code: body.addressCode });
    console.log(area);
    if (area) {
        const declare = await area.openDeclare(body.time_begin, body.time_end);
        res.json({ status: "ok", message: "cấp quyền khai báo thành công" });
    } else {
        res.json({ status: "error", message: "lỗi cấp quyền khai báo" });
    }
};

// // dong khai bao
// // theo doi tien do
// checkProgress() {}
// //phan tich

// // xem danh sach
// citizenList() {}
// // xem thong tin mot nguoi dan bat ki
// citizenInfo() {}
