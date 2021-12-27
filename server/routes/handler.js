const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserA1 = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const Area = require("../models/area.model");
const UserController = require("../controllers/user.controller");
const AreaController = require("../controllers/area.controller");
const CitizenController = require("../controllers/citizen.controller");
const permission = require("../middleware/permission");

router.post("/api/login", UserController.login);

router.put("/api/createarea", auth, permission, UserController.createArea);

router.post(
    "/api/opendeclaration",
    auth,
    permission,
    UserController.openDeclaration
);

router.post("/api/getareainfo", auth, AreaController.getAreaInfor);
router.post("/api/getchildarea", auth, AreaController.getChildArea);
router.post("/api/getareadata", auth, AreaController.getAreaData);
router.post("/api/citizenlist", auth, CitizenController.getCitizenList);
router.post("/api/citizeninfo", auth, CitizenController.getCitizenInfo);
router.post("/api/citizennumber", auth, CitizenController.getCitizenNumber);
router.post(
    "/api/citizennumbercatebygender",
    auth,
    CitizenController.getCitizenNumberCateByGender
);
router.post(
    "/api/citizennumbercatebyage",
    auth,
    CitizenController.getCitizenNumberCateByAge
);
router.post(
    "/api/citizennumbercatebyacademiclevel",
    auth,
    CitizenController.getCitizenNumberCateByAcademicLevel
);
router.put("/api/inputdata", auth, CitizenController.inputData);

module.exports = router;
