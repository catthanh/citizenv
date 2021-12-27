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

exports.getAreaInfor = async (req, res) => {
    const list = await Area.getDetailArea(req.body.addressCode);
    if (list !== null) {
        res.json({list, status: "ok", message: "Lấy dữ liệu địa phương thành công"});
    } else {
        res.json({status: "error", message: "Lấy dữ liệu địa phương không thành công"});
    }
}
