const Area = require("../models/area.model");
const User = require("../models/user.model");
const Citizen = require("../models/citizen.model");

exports.getCitizenList = async (req, res) => {
    const citizenv = await Citizen.getCitizenListFromProvince(
        req.body.addressCode
    );
    if (citizenv !== null) {
        res.json({
            citizenv,
            status: "ok",
            message: "Lấy dữ liệu người dân thành công",
        });
    } else {
        res.json({
            status: "error",
            message: "Lấy dữ liệu người dân không thành công",
        });
    }
};

exports.getCitizenNumber = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByProvince(
        req.body.addressCode
    );
    if (citizenv != -1) {
        res.json({
            citizenv,
            status: "ok",
            message: "Lấy số liệu dân số thành công",
        });
    } else {
        res.json({
            status: "error",
            message: "Lấy số liệu dân số không thành công",
        });
    }
};

exports.getCitizenNumberCateByGender = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByGender(
        req.body.addressCode
    );
    if (citizenv != -1) {
        res.json({
            citizenv,
            status: "ok",
            message: "Lấy số liệu dân số theo giới tính thành công",
        });
    } else {
        res.json({
            status: "error",
            message: "Lấy số liệu dân số theo giới tính không thành công",
        });
    }
};

exports.getCitizenNumberCateByAge = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByAged(
        req.body.addressCode
    );
    if (citizenv != -1) {
        res.json({
            citizenv,
            status: "ok",
            message: "Lấy số liệu dân số theo tuổi thành công",
        });
    } else {
        res.json({
            status: "error",
            message: "Lấy số liệu dân số theo tuổi không thành công",
        });
    }
};

exports.getCitizenNumberCateByAcademicLevel = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByAcademicLevel(
        req.body.addressCode
    );
    if (citizenv != -1) {
        res.json({
            citizenv,
            status: "ok",
            message: "Lấy số liệu dân số theo trình độ văn hóa thành công",
        });
    } else {
        res.json({
            status: "error",
            message:
                "Lấy số liệu dân số theo trình độ văn hóa không thành công",
        });
    }
};

exports.getCitizenInfo = async (req, res) => {
    const citizenv = await Citizen.getCitizenInfo(req.body.addressCode);
    if (citizenv !== null) {
        res.json({
            citizenv,
            status: "ok",
            message: "Lấy dữ liệu người dân thành công",
        });
    } else {
        res.json({
            status: "error",
            message: "Lấy dữ liệu người dân không thành công",
        });
    }
};

// exports.inputData = async (req, res) => {
//     const {id, ten, ngaysinh, gioitinh, CCCD, quequqn, dcthuongtru, dctamtru, tongiao, trinhdovh, nghe} = req.body;
//     if (await Citizen.findIdCitizen(id)) {
//         const answer1 = new Citizen(id, "1", ten);
//         const answer2 = new Citizen(id, "2", ngaysinh);
//         const answer3 = new Citizen(id, "3", gioitinh);
//         const answer4 = new Citizen(id, "4", CCCD);
//         const answer5 = new Citizen(id, "5", quequqn);
//         const answer6 = new Citizen(id, "6", dcthuongtru);
//         const answer7 = new Citizen(id, "7", dctamtru);
//         const answer8 = new Citizen(id, "8", tongiao);
//         const answer9 = new Citizen(id, "9", trinhdovh);
//         const answer10 = new Citizen(id, "10", nghe);

//         // if (answer1.checkDuplicate() && answer2.checkDuplicate() && answer3.checkDuplicate() && 
//         //     answer4.checkDuplicate() && answer5.checkDuplicate() && answer6.checkDuplicate() && 
//         //     answer7.checkDuplicate() && answer8.checkDuplicate() && answer9.checkDuplicate() && answer10.checkDuplicate()){
//         //     res.json({status: "error", message: "Trùng câu hỏi"});
//         // } else 
//         if (answer1.inputData() && answer2.inputData() && answer3.inputData() && answer4.inputData() && 
//             answer5.inputData() && answer6.inputData() && answer7.inputData() && answer8.inputData() && 
//             answer9.inputData() && answer10.inputData()) {
//                 res.json({status: "ok", message: "Nhập dữ liệu thành công"});
//         }
//         else res.json({status: "error", message: "Nhập không dữ liệu thành công"});
//     } else res.json({status: "error", message: "Không tìm thấy citizen"});
    
// }

exports.inputData = async (req, res) => {
    const {ten, ngaysinh, gioitinh, CCCD, quequan, dcthuongtru, dctamtru, tongiao, trinhdovh, nghe} = req.body;
    const citizenv = await Citizen.inputData(ten, ngaysinh, gioitinh, CCCD, quequan, dcthuongtru, dctamtru, tongiao, trinhdovh, nghe);
    if (citizenv != null)
        res.json({status: "ok", message: "Nhập dữ liệu thành công"});
    else res.json({status: "error", message: "Nhập dữ liệu không thành công"});
}
