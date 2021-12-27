const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserA1 = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const Area = require("../models/area.model");
const UserController = require("../controllers/user.controller");
const AreaController = require("../controllers/area.controller");
const permission = require("../middleware/permission");

router.post("/api/login", UserController.login);

router.put("/api/createarea", auth, permission, UserController.createArea);

router.post(
    "/api/opendeclaration",
    auth,
    permission,
    UserController.openDeclaration
);
router.post("/api/getchildarea", auth, AreaController.getChildArea);
router.post("/api/getareadata", auth, AreaController.getAreaData);
router.post("/api/citizenlist", auth, CitizenController.getCitizenList);

module.exports = router;
