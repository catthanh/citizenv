const Area = require("../models/area.model");
const User = require("../models/user.model");

exports.getChildArea = async (req, res) => {
    const list = await Area.getChildList(req.body.addressCode);
    res.json(list);
};

exports.getAreaData = async (req, res) => {
    const list = await Area.getAreaData(req.body.addressCode);
    res.json(list);
};
