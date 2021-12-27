const Area = require("../models/area.model");
const User = require("../models/user.model");
const Citizen = require("../models/citizen.model");

exports.getCitizenList = async (req, res) => {
    const citizenv = await Citizen.getCitizenListFromProvince(req.body.addressCode);
    if (citizenv !== null) {
        res.json({citizenv, status: "ok", message: "Lấy dữ liệu người dân thành công"});
    } else {
        res.json({status: "error", message: "Lấy dữ liệu người dân không thành công"})
    }
};

exports.getCitizenNumber = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByProvince(req.body.addressCode);
    if(citizenv != -1) {
        res.json({citizenv, status: "ok", message: "Lấy số liệu dân số thành công"});
    } else {
        res.json({status: "error", message: "Lấy số liệu dân số không thành công"});
    }
};

exports.getCitizenNumberCateByGender = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByGender(req.body.addressCode);
    if (citizenv != -1) {
        res.json({citizenv, status: "ok", message: "Lấy số liệu dân số theo giới tính thành công"});
    } else {
        res.json({status: "error", message: "Lấy số liệu dân số theo giới tính không thành công"});
    }
    
};

exports.getCitizenNumberCateByAge = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByAged(req.body.addressCode);
    if (citizenv != -1) {
        res.json({citizenv, status: "ok", message: "Lấy số liệu dân số theo tuổi thành công"});
    } else {
        res.json({status: "error", message: "Lấy số liệu dân số theo tuổi không thành công"});
    }
};

exports.getCitizenNumberCateByAcademicLevel = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByAcademicLevel(req.body.addressCode);
    if (citizenv != -1) {
        res.json({citizenv, status: "ok", message: "Lấy số liệu dân số theo trình độ văn hóa thành công"});
    } else {
        res.json({status: "error", message: "Lấy số liệu dân số theo trình độ văn hóa không thành công"});
    }
};

exports.getCitizenInfo = async (req, res) => {
    const citizenv = await Citizen.getCitizenInfo(req.body.addressCode);
    if(citizenv !== null) {
        res.json({citizenv, status: "ok", message: "Lấy dữ liệu người dân thành công"});
    } else {
        res.json({status: "error", message: "Lấy dữ liệu người dân không thành công"});
    }
}
