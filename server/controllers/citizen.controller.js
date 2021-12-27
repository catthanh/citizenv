const Area = require("../models/area.model");
const User = require("../models/user.model");
const Citizen = require("../models/citizen.model");

exports.getCitizenList = async (req, res) => {
    const citizenv = await Citizen.getCitizenListFromProvince(req.addressCode);
    res.json(citizenv);
};
