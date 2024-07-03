const userController = require("../Controller/user");
const express = require("express");
const router = express.Router();

router.post("/adduser", userController.Addusers);
router.post("/loginuser", userController.Loginuser);
router.get("/getalluser", userController.getAlluser);
router.get("/getuser", userController.getSearcheduser);
router.get("/getbyuserid/:id", userController.getByid);
router.put("/edituser/:id", userController.update);
router.post("/trash/:id", userController.trash);

module.exports = router;
