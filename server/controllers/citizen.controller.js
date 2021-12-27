const Area = require("../models/area.model");
const User = require("../models/user.model");
const Citizen = require("../models/citizen.model");

exports.getCitizenList = async (req, res) => {
    const citizenv = await Citizen.getCitizenListFromProvince(
        req.body.addressCode
    );
    res.json(citizenv);
};

exports.getCitizenNumber = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByProvince(
        req.body.addressCode
    );
    if (citizenv == -1) {
        res.json({ status: "error", message: "lỗi" });
    }
    res.json({ citizenv, status: "ok", message: "thành công" });
};

exports.getCitizenNumberCateByGender = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByGender(
        req.body.addressCode
    );
    res.json(citizenv);
};

exports.getCitizenNumberCateByAge = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByAged(
        req.body.addressCode
    );
    res.json(citizenv);
};

exports.getCitizenNumberCateByAcademicLevel = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByAcademicLevel(
        req.body.addressCode
    );
    res.json(citizenv);
};
