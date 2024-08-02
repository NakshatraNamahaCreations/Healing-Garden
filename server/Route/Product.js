const WorkshopController = require("../Controller/Product");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addworkshop",
  upload.array("WorkshopImages", 10),
  WorkshopController.AddProduct
);
router.get("/getallworkshop", WorkshopController.getAllProduct);
router.get("/getworkshop", WorkshopController.getSearchedProduct);
router.get("/getbyworkshopbyid/:id", WorkshopController.getByid);
router.get("/getworkshopbyuser/:id", WorkshopController.getByUserid);
router.put(
  "/editworkshop/:id",
  upload.array("WorkshopImages", 10),
  WorkshopController.update
);
router.post("/trash/:id", WorkshopController.trash);
router.get("/getbyuser", WorkshopController.GetDataWithClients);

router.put("/makelive/:id", WorkshopController.updateLive);

module.exports = router;
