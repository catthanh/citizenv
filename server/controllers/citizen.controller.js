const Area = require("../models/area.model");
const User = require("../models/user.model");
const Citizen = require("../models/citizen.model");

exports.getCitizenList = async (req, res) => {
    const citizenv = await Citizen.getCitizenListFromProvince(req.addressCode);
    res.json(citizenv);
};

exports.getCitizenNumber = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByProvince(req.addressCode);
    res.json(citizenv);
};

exports.getCitizenNumberCateByGender = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByGender(req.addressCode);
    res.json(citizenv);
};

exports.getCitizenNumberCateByAge = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByAged(req.addressCode);
    res.json(citizenv);
};

exports.getCitizenNumberCateByAcademicLevel = async (req, res) => {
    const citizenv = await Citizen.getCitizenListCateByAcademicLevel(req.addressCode);
    res.json(citizenv);
};



