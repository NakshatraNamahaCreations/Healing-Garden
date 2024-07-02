const subcategoryController = require("../Controller/subcategory");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/subCategory");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addsubcategory",
  upload.single("subcategoryImage"),
  subcategoryController.AddsubCategory
);
router.get("/getallsubcategory", subcategoryController.getAllsubcategory);
router.get("/getsubcategory", subcategoryController.getSearchedsubCategory);
router.get("/getbysubcategoryid/:id", subcategoryController.getByid);
router.put(
  "/editsubcategory/:id",
  upload.single("subcategoryImage"),
  subcategoryController.update
);
router.post("/trash/:id", subcategoryController.trash);

module.exports = router;
